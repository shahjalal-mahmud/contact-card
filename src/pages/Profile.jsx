import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p className="mt-2">Showing profile for user: <strong>{userId}</strong></p>
    </div>
  );
}
