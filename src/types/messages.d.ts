declare module "*.json" {
  const value: {
    common: {
      dashboard: string;
      agents: string;
      conversations: string;
      analytics: string;
      team: string;
      settings: string;
      help: string;
      configure: string;
      chat: string;
      evaluate: string;
    };
    agents: {
      title: string;
      subtitle: string;
      createNew: string;
      edit: string;
      delete: string;
    };
    dashboard: {
      title: string;
      subtitle: string;
    };
  };
  export default value;
}
