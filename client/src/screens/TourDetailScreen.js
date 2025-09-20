import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tours } from '../data/mockData';
import "./TourDetailScreen.css";

// Chuẩn hóa dữ liệu bình luận
const normalize = (rawComments = []) =>
  rawComments.map(c => ({
    id: c.id ?? Math.floor(Date.now() + Math.random() * 10000),
    user: c.user ?? 'Khách',
    text: c.text ?? '',
    likes: Number(c.likes) || 0,
    dislikes: Number(c.dislikes) || 0,
    userVote: c.userVote ?? null, // thêm trạng thái vote
    replies: (c.replies || []).map(r => ({
      id: r.id ?? Math.floor(Date.now() + Math.random() * 10000),
      user: r.user ?? 'Khách',
      text: r.text ?? '',
      likes: Number(r.likes) || 0,
      dislikes: Number(r.dislikes) || 0,
      userVote: r.userVote ?? null
    }))
  }));

const TourDetailScreen = () => {
  const { id } = useParams();
  const tour = tours.find((t) => t.tourId === parseInt(id));
  const [comments, setComments] = useState(() => normalize(tour?.comments || []));
  const [newComment, setNewComment] = useState('');

  if (!tour) return <p>Tour không tồn tại.</p>;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: Math.floor(Date.now() + Math.random() * 10000),
      user: 'Khách',
      text: newComment,
      likes: 0,
      dislikes: 0,
      userVote: null,
      replies: []
    };
    setComments(prev => [...prev, newEntry]);
    setNewComment('');
  };

  // Hàm cập nhật like/dislike toggle
  const handleVote = (targetId, type) => {
    const updateVotes = (list) =>
      list.map(c => {
        if (c.id === targetId) {
          let { likes, dislikes, userVote } = c;

          if (type === "like") {
            if (userVote === "like") {
              likes -= 1;
              userVote = null;
            } else if (userVote === "dislike") {
              dislikes -= 1;
              likes += 1;
              userVote = "like";
            } else {
              likes += 1;
              userVote = "like";
            }
          } else if (type === "dislike") {
            if (userVote === "dislike") {
              dislikes -= 1;
              userVote = null;
            } else if (userVote === "like") {
              likes -= 1;
              dislikes += 1;
              userVote = "dislike";
            } else {
              dislikes += 1;
              userVote = "dislike";
            }
          }

          return { ...c, likes, dislikes, userVote };
        }

        return { ...c, replies: updateVotes(c.replies || []) };
      });

    setComments(prev => updateVotes(prev));
  };

  const handleReply = (commentId, replyText) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Math.floor(Date.now() + Math.random() * 10000),
      user: 'Khách',
      text: replyText,
      likes: 0,
      dislikes: 0,
      userVote: null
    };
    setComments(prev =>
      prev.map(c =>
        c.id === commentId ? { ...c, replies: [...(c.replies || []), newReply] } : c
      )
    );
  };

  return (
    <div className="tour-detail">
      <h2>{tour.title}</h2>
      <img
        src={tour.images[0]}
        alt={tour.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      <p><strong>Thời gian:</strong> {tour.time}</p>
      <p><strong>Giá người lớn:</strong> {tour.priceAdult.toLocaleString()} VND</p>
      <p><strong>Mô tả:</strong> {tour.description}</p>

      <h4>Bình luận</h4>
      <div className="comments-section">
        {comments.length === 0 ? (
          <p>Chưa có bình luận nào.</p>
        ) : (
          <ul>
            {comments.map(c => (
              <CommentItem
                key={c.id}
                comment={c}
                onVote={handleVote}
                onReply={handleReply}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="comment-form">
        <textarea
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Gửi</button>
      </div>
    </div>
  );
};

const CommentItem = ({ comment, onVote, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleSendReply = () => {
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <li className="comment-item">
      <p><strong>{comment.user}:</strong> {comment.text}</p>
      <div className="comment-actions">
        <button
          className={comment.userVote === "like" ? "active" : ""}
          onClick={() => onVote(comment.id, 'like')}
        >
          👍 {comment.likes ?? 0}
        </button>
        <button
          className={comment.userVote === "dislike" ? "active" : ""}
          onClick={() => onVote(comment.id, 'dislike')}
        >
          👎 {comment.dislikes ?? 0}
        </button>
        <button onClick={() => setShowReplyBox(!showReplyBox)}>
          {showReplyBox ? "Hủy" : "Trả lời"}
        </button>
      </div>

      {showReplyBox && (
        <div className="reply-form">
          <textarea
            placeholder="Viết phản hồi..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleSendReply}>Gửi</button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <ul className="reply-list">
          {comment.replies.map(r => (
            <li key={r.id} className="reply-item">
              <p><strong>{r.user}:</strong> {r.text}</p>
              <div className="comment-actions">
                <button
                  className={r.userVote === "like" ? "active" : ""}
                  onClick={() => onVote(r.id, 'like')}
                >
                  👍 {r.likes ?? 0}
                </button>
                <button
                  className={r.userVote === "dislike" ? "active" : ""}
                  onClick={() => onVote(r.id, 'dislike')}
                >
                  👎 {r.dislikes ?? 0}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default TourDetailScreen;
