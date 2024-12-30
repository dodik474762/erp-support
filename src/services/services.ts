import Message from "@/utility/message";

export const handleDeleteData = (e: any, base_url: string, id: any, resultAction: any) => {
  const authToken = localStorage.getItem("authToken");
  e.preventDefault();
  Message.question("Apa anda yakin menghapus data ini?", async () => {
    const req = await fetch(process.env.API_BASE_URL + base_url + "/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const res = await req.json();
    resultAction(res);
  });
};
