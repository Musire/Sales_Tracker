type Props = {
  params: Promise<{ token: string }>
}

// Make sure "default" is included!
export default async function TokenInvitePage({ params }: Props) {
  const { token } = await params
  
  return (
    <div>
      <h1>Invitation Token: {token}</h1>
    </div>
  )
}
