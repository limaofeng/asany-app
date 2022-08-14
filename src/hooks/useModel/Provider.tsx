import React from 'react';

import auth from '@/models/auth';
// import model0 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/calendar";
// import model1 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/cloud-drive/index";
// import model2 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/contacts";
// import model3 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/open-im/auth";
// import model4 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/open-im/contacts";
// import model5 from "/Users/limaofeng/Workspace/components/asany-admin/src/models/open-im/cve";
import Dispatcher from './helpers/dispatcher';
import Executor from './helpers/executor';
import { UmiContext } from './helpers/constant';

export const models = {
  auth: auth,
  // calendar: model0,
  // 'cloud-drive.index': model1,
  // contacts: model2,
  // 'open-im.auth': model3,
  // 'open-im.cve': model5,
  // 'open-im.contacts': model4,
};

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T];

const dispatcher = new Dispatcher();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <UmiContext.Provider value={dispatcher}>
      {Object.entries(models).map((pair) => (
        <Exe
          key={pair[0]}
          namespace={pair[0]}
          hook={pair[1] as any}
          onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            (dispatcher.data as any)[ns] = val;
            dispatcher.update(ns);
          }}
        />
      ))}
      {children}
    </UmiContext.Provider>
  );
};
