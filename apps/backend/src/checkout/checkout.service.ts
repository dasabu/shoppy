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
}
