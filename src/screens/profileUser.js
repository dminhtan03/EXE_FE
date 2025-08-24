import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import HeaderLogin from '../components/HeaderLogin';
import FooterHome from '../components/FooterLogin';


const UserProfile = () => {
    const { user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        address: user?.address || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPass: '',
        newPass: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert("Cập nhật thông tin thành công!");
        setUser({ ...user, ...formData });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.oldPass === user.password) {
            alert("Đổi mật khẩu thành công!");
            setUser({ ...user, password: passwordData.newPass });
        } else {
            alert("Mật khẩu cũ không đúng!");
        }
    };

    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <h4>Bạn cần đăng nhập để xem thông tin cá nhân.</h4>
                <Link to="/" className="btn btn-primary mt-3">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    return (
        <>
            <Link to="/#" className="chatbot-fixed" title="Trợ lý ảo Campverse">
                <img src={`/assets/images/login/chatbot.png`} alt="Chatbot" />
            </Link>
            <HeaderLogin />
            <div className="user-profile">
                <div className="container-xl px-4 mt-4">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4">
                                <div className="card-header">Ảnh đại diện</div>
                                <div className="card-body text-center">
                                    <img
                                        className="img-account-profile rounded-circle mb-2"
                                        src={user.avatar || "https://i.pravatar.cc/160"}
                                        style={{ width: 160, height: 160 }}
                                        alt="Avatar"
                                    />
                                    <div className="small text-muted mb-4">JPG hoặc PNG nhỏ hơn 5MB</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Thông tin tài khoản</div>
                                <div className="card-body">
                                    <form onSubmit={handleProfileSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Họ và tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            Lưu thông tin
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header">Đổi mật khẩu</div>
                                <div className="card-body">
                                    <form onSubmit={handlePasswordSubmit}>
                                        <div className="row gx-3">
                                            <div className="col-md-4 mb-3">
                                                <input
                                                    className="form-control"
                                                    name="oldPass"
                                                    type="password"
                                                    placeholder="Mật khẩu cũ"
                                                    value={passwordData.oldPass}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <input
                                                    className="form-control"
                                                    name="newPass"
                                                    type="password"
                                                    placeholder="Mật khẩu mới"
                                                    value={passwordData.newPass}
                                                    onChange={handlePasswordChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <button className="btn btn-primary" type="submit">
                                                    Thay đổi
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <FooterHome />
        </>
    );
};

export default UserProfile;
