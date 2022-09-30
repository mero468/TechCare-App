import React, {  useEffect,useState,useCallback  } from 'react'
import { StyleSheet, Text,Linking,View, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'

const LazyLoadParent =() => {
    const container = React.createRef(null);
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={10}
          onScroll={(event) => {
            container.current.onScroll();
          }}
          bounces={false}
          scrollEnabled={true}
        >
          <View>
            <ImageLazyLoad
              ref={container}
            />
          </View>
        </ScrollView>
      </>
    );
}

const ImageLazyLoad = React.forwardRef((props, ref) => {
    const marker1 = React.useRef(null);
    const marker2 = React.useRef(null);
    const marker3 = React.useRef(null);
    const [markerVisible, setmarkerVisible] = useState(0);
  
    // marker Visible set with value -> 1,2,3
    React.useImperativeHandle(ref, () => ({
      onScroll: () => {
        marker1
          && marker1.current
          && marker1.current.measure((x, y, width, height, pageX, pageY) => {
            if (pageY < heightWindow + 100 && markerVisible === 0) {
              setmarkerVisible(1);
            }
          });
        marker2
          && marker2.current
          && marker2.current.measure((x, y, width, height, pageX, pageY) => {
            if (pageY < heightWindow + 100 && markerVisible === 1) {
              setmarkerVisible(2);
            }
          });
        marker3
          && marker3.current
          && marker3.current.measure((x, y, width, height, pageX, pageY) => {
            if (pageY < heightWindow + 100 && markerVisible === 2) {
              setmarkerVisible(3);
            }
          });
      },
    }));
  
    const renderComponent = (
      <>
        {[1,2,3].map((item) => {
              return (
                <View
                  ref={
                      item.key === 1
                        ? marker1
                        : item.key === 2
                          ? marker2
                          : item.key === 3
                            ? marker3
                                : null
                    }
                  key={`${item.key}`}
                  onLayout={(event) => event.target.measure(() => {})}
                >
                  <If condition={markerVisible >= item.key}>
                    <FastImage
                      source={{
                        uri, // setup your own uri
                        priority: FastImage.priority.low,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </If>
                  <If condition={markerVisible < item.key}>
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </If>
                </View>
              );
          })}
      </>
    );
    return <>{renderComponent}</>;
  });
        