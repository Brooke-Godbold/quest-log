import supabase from "../services/supabase";

export function pushMessagesUpdate(partnerId) {
  const messageSenderChannel = supabase.channel(partnerId);

  messageSenderChannel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      messageSenderChannel.send({
        type: "broadcast",
        event: "messages",
        payload: {
          message: `messages_${partnerId}`,
        },
      });
    }
  });
}
