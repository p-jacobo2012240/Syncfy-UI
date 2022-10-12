export interface SideMenu {
    name: string;
    key: ACTIONS;
}

export enum ACTIONS {
    ALERTS,
    AUTOMATED_TASKS,
    NOTIFICATIONS,
}

export const menuOptions: SideMenu[] = [
    {
        name: 'Alertas', 
        key: ACTIONS.ALERTS, 
    },
    { 
        name: 'Tareas automatizadas', 
        key: ACTIONS.AUTOMATED_TASKS,
    },
    { 
        name: 'Notificaciones', 
        key: ACTIONS.NOTIFICATIONS, 
    },
];