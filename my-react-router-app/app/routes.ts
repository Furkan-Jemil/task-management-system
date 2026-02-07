import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/_auth/login.tsx"),
    route("register", "routes/_auth/register.tsx"),
    // Placeholder for protected routes
    route("dashboard", "routes/projects.tsx"),
    route("tasks", "routes/tasks.tsx"),
] satisfies RouteConfig;
