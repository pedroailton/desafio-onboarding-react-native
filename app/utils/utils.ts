import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const guidelinBaseWidth = 375; // baseada na largura do iPhone 11, que é a referência para muitos designs

// Essa função aumenta a fonte proporcionalmente ao tamanho da tela
export const scaleFont = (size: number) => (width / guidelinBaseWidth) * size;