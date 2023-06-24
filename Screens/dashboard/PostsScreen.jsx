import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  uploadLikeToServer,
  incrementLikeToServer,
  decrementLikeToServer,
} from "../../firebase/hooks";
import {
  getAllPostsThunk,
  getUserPostsThunk,
  getAllCommentsThunk,
  getAllLikesThunk,
} from "../../redux/dashboard/postOperations";
import { getUser } from "../../redux/auth/authSelectors";
import {
  selectPosts,
  getComments,
  getLikes,
} from "../../redux/dashboard/postSelectors";
import {
  comment,
  commentColor,
  like,
  likeColor,
  local,
} from "../../images/iconsSVG";

// eslint-disable-next-line no-unused-vars
const Tabs = createBottomTabNavigator();

const PostsScreen = ({ navigation }) => {
  const { uid, name, email, avatar } = useSelector(getUser);
  const posts = useSelector(selectPosts);
  const comments = useSelector(getComments);
  const likes = useSelector(getLikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(getUserPostsThunk(uid));
    dispatch(getAllCommentsThunk());
    dispatch(getAllLikesThunk());
  }, [dispatch, uid]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <TouchableOpacity
          style={styles.userPhotoBox}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.userNoPhotoBox}>
            {avatar && (
              <Image source={{ uri: avatar }} style={styles.userPhoto} />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.userInfoBox}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userMail}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const totalComments = comments.filter(
            (value) => value.postId === item.id
          ).length;

          const myComments = comments.filter(
            (value) => value.postId === item.id && value.user_id === uid
          ).length;

          const totalLikes = () => {
            const likesArr = likes.filter((value) => value.postId === item.id);
            const total = likesArr.reduce((previousValue, element) => {
              return previousValue + element.likes;
            }, 0);
            return total;
          };

          const myLikes = likes.filter(
            (value) => value.postId === item.id && value.user_id === uid
          );

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
                  <View>{myComments === 0 ? comment : commentColor}</View>
                  <Text
                    style={
                      myComments === 0
                        ? styles.commentText
                        : styles.commentTextColor
                    }
                  >
                    {totalComments}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.infoBoxLike}
                  onPress={async () => {
                    if (myLikes.length === 0) {
                      await uploadLikeToServer({ id: item.id, uid, name });
                    } else if (myLikes[0].likes === 0) {
                      await incrementLikeToServer({
                        id: item.id,
                        likeMy: myLikes[0].id,
                      });
                    } else {
                      await decrementLikeToServer({
                        id: item.id,
                        likeMy: myLikes[0].id,
                      });
                    }
                    dispatch(getAllLikesThunk());
                  }}
                >
                  <View>
                    {myLikes.length === 0 || myLikes[0].likes === 0
                      ? like
                      : likeColor}
                  </View>
                  <Text
                    style={
                      myLikes.length === 0 || myLikes[0].likes === 0
                        ? styles.likeText
                        : styles.likeTextColor
                    }
                  >
                    {totalLikes()}
                  </Text>
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
    paddingRight: 14,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginBottom: 32,
  },
  userNoPhotoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  userPhotoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
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
    fontFamily: "Roboto_Medium",
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
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  commentTextColor: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  infoBoxLike: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: "auto",
  },
  likeText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 8,
  },
  likeTextColor: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
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
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginRight: 10,
  },
});

PostsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PostsScreen;
