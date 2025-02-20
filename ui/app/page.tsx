import getMe from './_action/get-me.action'

export default async function Home() {
  const me = await getMe()
  console.log('me: ', me)

  return <></>
}
