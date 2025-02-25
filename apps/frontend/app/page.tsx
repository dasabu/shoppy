import getMe from './actions/get-me.action'

export default async function Home() {
  const me = await getMe()
  console.log(me)
  return <></>
}
