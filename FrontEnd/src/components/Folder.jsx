
export default function Folder({data:{name,id,parentFolderId,createdAt}}) {
  return (
    <article>
      <p>📁{name}</p>
      <p>{createdAt}</p>
    </article>
  )
}
