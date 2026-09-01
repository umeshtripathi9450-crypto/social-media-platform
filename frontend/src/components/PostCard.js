import React, { useState } from 'react';
import { postService } from '../services/services';
import '../styles/post.css';

export const PostCard = ({ post, onDeleted }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    try {
      if (liked) {
        await postService.unlikePost(post._id);
        setLikes(likes - 1);
      } else {
        await postService.likePost(post._id);
        setLikes(likes + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await postService.addComment(post._id, { content: newComment });
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(post._id);
        onDeleted(post._id);
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <strong>{post.author?.username}</strong>
          <span className="post-time">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-stats">
        <span>{likes} likes</span>
        <span>{post.comments?.length || 0} comments</span>
      </div>

      <div className="post-actions">
        <button 
          onClick={handleLike}
          className={liked ? 'liked' : ''}
        >
          ❤️ Like
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>
        <button onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          <div className="comments-list">
            {post.comments?.map((comment, idx) => (
              <div key={idx} className="comment">
                <strong>{comment.author?.username}</strong>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
