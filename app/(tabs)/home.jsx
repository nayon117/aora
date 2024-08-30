import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View>
            <Text className="text-white text-3xl">{item.id}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6 px-4">
            <View className="justify-between items-start flex-row">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Hasibul Hasan
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-12"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending  posts={[{id:1}, {id:2}, {id:3}] ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <View className=''>
            <Text className='text-white text-lg font-pmedium'>No Videos Found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
