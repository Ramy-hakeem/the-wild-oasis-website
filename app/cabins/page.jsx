async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Page;
