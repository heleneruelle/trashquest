import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TrashQuest" },
    { name: "description", content: "TrashQuest connects communities to clean up public spaces and protect nature!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to TrashQuest !</h1>
    </div>
  );
}
