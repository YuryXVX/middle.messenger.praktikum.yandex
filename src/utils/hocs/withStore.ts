// import { BlockClass, Store } from 'core';

import { store } from '../../store';
import { areDeepEqual } from '../objects-utils';

// type WithStateProps = { store: Store<AppState> };

export function withStore(WrappedBlock: any, mapStateToProps: (state: Indexed) => Indexed) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: any) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      this.$store = store;

      this.onChangeStoreCallback = () => {
        const newState = mapStateToProps(store.getState());
        const isEqual = areDeepEqual(state, newState);

        if (isEqual) return;

        this.setProps({ ...this.props, ...newState });
      };

      store.on('changed', this.onChangeStoreCallback);
    }

  
    componentWillUnmount() {
      super.componentWillUnmount();
      store.off('changed', this.onChangeStoreCallback);
    }
  };
}