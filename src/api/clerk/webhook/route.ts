export const POST = async (req: Request) => {
  const { data } = await req.json();
  console.log("🚀 ~ POST ~ data:", data);
  const emailAddress = data.email_addresses[0].email_address;
  const firstName = data.first_name;
  const lastName = data.last_name;
  const imageUrl = data.image_url;
  const id = data.id;

  return new Response("Webhook received", {
    status: 200,
    statusText: "success",
  });
};
