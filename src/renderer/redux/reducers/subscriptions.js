// @flow
import * as actions from "constants/action_types";
import { handleActions } from "util/redux-utils";

// Subscription redux types
export type SubscriptionState = {
  subscriptions: Array<Subscription>,
  hasFetchedSubscriptions: boolean
};

export type Subscription = {
  channelName: string,
  uri: string,
};

// Subscription action types
type doChannelSubscribe = {
  type: actions.CHANNEL_SUBSCRIBE,
  data: Subscription,
};

type doChannelUnsubscribe = {
  type: actions.CHANNEL_UNSUBSCRIBE,
  data: Subscription,
};

type HasFetchedSubscriptions = {
  type: actions.HAS_FETCHED_SUBSCRIPTIONS
}

export type Action = doChannelSubscribe | doChannelUnsubscribe | HasFetchedSubscriptions;
export type Dispatch = (action: Action) => any;

const defaultState = {
  subscriptions: [],
  hasFetchedSubscriptions: false
};

export default handleActions(
  {
    [actions.CHANNEL_SUBSCRIBE]: (
      state: SubscriptionState,
      action: doChannelSubscribe
    ): SubscriptionState => {
      const newSubscription: Subscription = action.data;
      let newSubscriptions: Array<Subscription> = state.subscriptions.slice();
      newSubscriptions.unshift(newSubscription);

      return {
        ...state,
        subscriptions: newSubscriptions,
      };
    },
    [actions.CHANNEL_UNSUBSCRIBE]: (
      state: SubscriptionState,
      action: doChannelUnsubscribe
    ): SubscriptionState => {
      const subscriptionToRemove: Subscription = action.data;

      const newSubscriptions = state.subscriptions
        .slice()
        .filter(subscription => {
          return subscription.channelName !== subscriptionToRemove.channelName;
        });

      return {
        ...state,
        subscriptions: newSubscriptions,
      };
    },
    [actions.HAS_FETCHED_SUBSCRIPTIONS]: (
      state: SubscriptionState,
      action: HasFetchedSubscriptions
    ): SubscriptionState => ({
      ...state,
      hasFetchedSubscriptions: true
    })
  },
  defaultState
);
