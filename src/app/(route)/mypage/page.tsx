export default async function UserPage() {
  const response = await fetch("http://localhost:3000/api/v1/users/profiles", {
    method: "get",
  });
  const { data: user } = await response.json();
  return (
    <div>
      <p>{user.userName}</p>
      <p>{user.userEmail}</p>
      <p>{user.userRank}</p>
    </div>
  );
}
