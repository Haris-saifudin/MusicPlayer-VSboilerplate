import MMKVStoragePersistHelper from '../Helper/MMKVStoragePersistHelper';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.1',
  storeConfig: {
    key: 'root',
    storage: MMKVStoragePersistHelper,
    // Reducer keys that you do NOT want stored to persistence here.
    // blacklist: ['login', 'search', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: ['sample'
    whitelist: ['sample']
  }
};

export default REDUX_PERSIST;
