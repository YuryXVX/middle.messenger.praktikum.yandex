// import Block from '../../core/Block';
// import { Store } from '../../core/Store';
import { store } from '../../store';

export function areDeepEqual<T extends any>(value1: T, value2: T): boolean {
  const type1 = typeof value1;
  const type2 = typeof value2;
  if (type1 !== type2) {
    return false;
  }
  
  if (type1 !== 'object') {
    return value1 === value2;
  }
  
  const isArray1 = Array.isArray(value1);
  const isArray2 = Array.isArray(value2);
  
  if (isArray1 !== isArray2) {
    return false;
  }
  
  if (isArray1) {
    const array1 = value1 as any[];
    const array2 = value2 as any[];
  
    if (array1.length !== array2.length) {
      return false;
    }
  
    return array1.every((member1, i) => areDeepEqual(member1, array2[i]));
  }
  
  const object1 = value1 as any;
  const object2 = value2 as any;
  const keys1 = Object.keys(object1);
  
  return keys1.every((key1) => areDeepEqual(object1[key1], object2[key1]));
}

export function withStore(WrappedBlock: any, mapStateToProps: (state: Indexed) => Indexed) {
  //@ts-ignore
  return class extends WrappedBlock<P> {
    // @ts-ignore
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: any) {
      super({ ...props, store });
    
      this.$store = store;
    }

    __onChangeStoreCallback = () => {
      // @ts-ignore
      const isEqual = areDeepEqual(this.props.state, store.state);

      if (!isEqual) {
        this.setProps({ ...mapStateToProps(this.$store.getState()) });

      }    
    };


    componentDidMount(props: any) {
      super.componentDidMount(props);

      this.$store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      this.$store.off('changed', this.__onChangeStoreCallback);
    }
  };
}