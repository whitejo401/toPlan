import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("boards", [
      index("features/boards/pages/boards-page.tsx"),
      route("/:boardId", "features/boards/pages/board-page.tsx"),    
    ]),
    ...prefix("schedules", [
      index("features/schedules/pages/schedules-page.tsx"),
      route("/:scheduleId", "features/schedules/pages/schedule-page.tsx"),    
    ]),
    ...prefix("tasks", [
      index("features/tasks/pages/tasks-page.tsx"),

    ]),
    ...prefix("groups", [
      index("features/groups/pages/groups-page.tsx"),
      route("/:groupId", "features/groups/pages/group-page.tsx"),    
    ]),
    ...prefix("auth", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
    ]),
  ] satisfies RouteConfig;