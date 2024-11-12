import type { MetaFunction, LinksFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TrashQuest" },
    { name: "description", content: "TrashQuest connects communities to clean up public spaces and protect nature!" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/styles/main.css" }];
};

export default function Index() {
  return (
    <div className="welcome__container--wip">
      <h1>Welcome to TrashQuest !</h1>
      <p className="welcome__description">🏗️ TrashQuest connects communities to clean up public spaces and protect nature.<br/> It is a work in progress, please find the project description <a href="https://github.com/heleneruelle/trashquest/blob/main/README.md">in our github repository</a> <br/>and contact <strong>heleneruelle@hotmail.com</strong> if you want to join !</p>
    </div>
  );
}
