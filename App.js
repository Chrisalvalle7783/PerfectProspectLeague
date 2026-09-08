import React from 'react';
import { BackHandler, Linking, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webRef = React.useRef(null);
  const [canGoBack, setCanGoBack] = React.useState(false);

  React.useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden />
      <WebView
        ref={webRef}
        source={{ uri: 'file:///android_asset/perfectprospect.html' }}
        style={styles.web}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        mixedContentMode="always"
        geolocationEnabled
        setSupportMultipleWindows={false}
        onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url || '';
          if (url.startsWith('file:') || url.startsWith('about:') || url.startsWith('data:')) return true;
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('geo:')) {
            Linking.openURL(url).catch(() => {});
            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
});
