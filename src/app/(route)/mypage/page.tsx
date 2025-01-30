export default async function UserPage() {
  const response = await fetch("http://localhost:3000/api/v1/users/profiles", {
    method: "GET",
  });
  const { data: user } = await response.json();

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6">🥇🥈🥉</h3>
      <p className="text-lg font-semibold text-gray-800">{user.userName}</p>
      <p className="text-sm text-gray-500">{user.userEmail}</p>
    </div>
  );
}
