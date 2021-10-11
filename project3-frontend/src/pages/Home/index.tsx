import { User } from ".prisma/client";
import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { createUserFromAPI, getHelloFromAPI } from "../../helpers/api-calls";

export default function Home() {
  const [state, setState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getHelloFromAPI()
      .then((res) => {
        setState(res.data.message);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
    createUserFromAPI()
      .then((res) => {
        setUser(res.data);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);
  return (
    <PageContainer>
      <div>Hello world!! creazy boy</div>
      <div>{state ?? "Nothing"}</div>
      <pre>{user ? JSON.stringify(user, null, 2) : "Nope"}</pre>
    </PageContainer>
  );
}
