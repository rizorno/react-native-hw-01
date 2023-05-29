import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getCurrentUserThunk } from "../../redux/auth/authOperations";
import { getUser } from "../../redux/auth/authSelectors";
import { getPosts } from "../../redux/dashboard/postSelectors";
import { setPostsDB } from "../../redux/dashboard/postSlise";
import { getAllPostsThunk } from "../../redux/dashboard/postOperations";
import { comment, local } from "../../images/iconsSVG";
import avaUser from "../../images/avaUser.png";

const Tabs = createBottomTabNavigator();

const PostsScreen = ({ navigation }) => {
  const userInfo = useSelector(getUser);
  const [user, setUser] = useState(userInfo);
  const postsDataArr = useSelector(getPosts);
  const [posts, setPosts] = useState(postsDataArr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserThunk());
    dispatch(getAllPostsThunk());
    getAllPosts();
  }, [dispatch]);

  const getAllPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      let postsArr = [];
      await querySnapshot.forEach((doc) => {
        postsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        return postsArr;
      });

      setPosts(postsArr);
      // setPostsDB(postsArr);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <TouchableOpacity
          style={styles.userPhotoBox}
          onPress={() => navigation.navigate("Profile")}
        >
          {/* <Image source={{uri: avatarURL}} style={styles.userPhoto} /> */}
          <Image source={avaUser} style={styles.userPhoto} />
        </TouchableOpacity>
        <View style={styles.userInfoBox}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userMail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.postBox}>
              <View>
                <Image
                  source={{ uri: item.picture }}
                  style={styles.myPostImage}
                />
              </View>
              <Text style={styles.myPostTitle}>{item.title}</Text>
              <View style={styles.touchWrapper}>
                <TouchableOpacity
                  style={styles.infoBoxComment}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      pictureURL: item.picture,
                    })
                  }
                >
                  <View>{comment}</View>
                  <Text style={styles.commentText}>{item.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.infoBoxLocal}
                  onPress={() =>
                    navigation.navigate("Map", {
                      postCoords: item.coords,
                      postPlace: item.localisation,
                      postTitle: item.title,
                    })
                  }
                >
                  <View style={styles.localIcon}>{local}</View>

                  <Text style={styles.localText}>{item.localisation}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingLeft: 16,
    //  paddingRight: 11,
    paddingRight: 14,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 32,
  },
  userPhotoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userPhoto: {
    width: "100%",
    height: "100%",
  },
  userName: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 15,
  },
  userMail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto_Regular",
    fontSize: 11,
    lineHeight: 13,
  },
  postBox: {
    marginBottom: 32,
  },
  myPostImage: {
    width: "99%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  myPostTitle: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
  },
  touchWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoBoxComment: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoBoxLocal: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  localIcon: {
    marginRight: 8,
  },
  localText: {
    maxWidth: 255,
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginRight: 10,
  },
});

export default PostsScreen;
