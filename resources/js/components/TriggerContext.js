import React from 'react';

const TriggerContext = React.createContext({ trigger: 10 });

export const TriggerProvider = TriggerContext.Provider;
export const TriggerConsumer = TriggerContext.Consumer;
export default TriggerContext;
