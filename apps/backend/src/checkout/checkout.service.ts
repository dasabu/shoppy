import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripe: Stripe,
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  async createSession(productId: number) {
    const product = await this.productsService.getProduct(productId);
    // Create new checkout session: redirect to this session on the UI
    return this.stripe.checkout.sessions.create({
      // Include any data associated with checkout we want to persist to
      metadata: {
        productId,
      },
      // Specify the actual products included in the checkout
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: product.price * 100, // turn to dollar value
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity: 1, // hard code
        },
      ],
      mode: 'payment',
      // Stripe API is going to call after the checkout has successfully completed or failed
      success_url: this.configService.getOrThrow('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.getOrThrow('STRIPE_CANCEL_URL'),
    });
  }

  async handleCheckoutWebhook(event: any) {
    /**
     * Remember to run the Stripe CLI:
     * stripe listen --forward-to http://localhost:8005/checkout/webhook
     **/
    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const session = await this.stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );

    await this.productsService.update(parseInt(session.metadata.productId), {
      sold: true,
    });
  }
}
