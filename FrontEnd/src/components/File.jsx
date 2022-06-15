import fecha from "../helpers/fecha"


export default function File({data:{originalName,createdAt,id}}) {
  return (
    <article className="flex mx-2 relative">
      <p>📄{originalName}</p>
      <p className="absolute right-5">{fecha(createdAt)}</p>
    </article>
  )
}
