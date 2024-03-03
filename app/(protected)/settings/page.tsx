import { auth, signOut } from "@/auth";
async function SettingPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <p>{session?.user?.id}</p>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  );
}

export default SettingPage;
