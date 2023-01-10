import Block from '../../core/Block';
import { Store } from '../../core/Store';
import { store } from '../../store';
import { areDeepEqual } from '../objects-utils';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(
  WrappedBlock: Block<P>, mapStateToProps: (state: Indexed) => Indexed,
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    $store: Store<AppState>;

    private onChangeStoreCallback: () => void;

    // @ts-expect-error
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

  
    constructor(props: WithStateProps) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...state, store });

      this.$store = store;

      this.onChangeStoreCallback = () => {
        const newState = mapStateToProps(store.getState());
        
        const isEqual = areDeepEqual(state, newState);

        if (isEqual) return;
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, ...newState });
      };

      store.on('changed', this.onChangeStoreCallback);
    }

  
    componentWillUnmount() {
      super.componentWillUnmount();
      store.off('changed', this.onChangeStoreCallback);
    }
  } as Block<Omit<P, 'store'>>;
} 