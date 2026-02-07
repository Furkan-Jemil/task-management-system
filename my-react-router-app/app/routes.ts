import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/_auth/login.tsx"),
    route("register", "routes/_auth/register.tsx"),

    // Protected routes under AppLayout
    route("/", "components/layout/AppLayout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("projects", "routes/projects.tsx"),
        route("tasks", "routes/tasks.tsx"),
        route("tasks/:id", "routes/tasks.$id.tsx"),
    ]),
] satisfies RouteConfig;
