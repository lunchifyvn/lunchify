import React, {Component, PropTypes} from "react";
import {render} from 'react-dom';
import {Modal, Button} from 'react-bootstrap';

export default function (props) {
    return (
        <Modal className="login-modal" show={props.isOpenLogin} onHide={props.closeLogin}>
            <Modal.Header closeButton>
                <div className="text-center modal-logo"><img src="assets/img/logo.png"/></div>
            </Modal.Header>
            <Modal.Body>
                <p>Đăng nhập vào Lunchify để kết nối với hàng trăm người có cùng sở thích xung quanh bạn</p>
                <div className="btn-login">
                    <a onClick={props.login} className="social-btn fb-btn text-center" href="#">
                        <img className="icon" src="assets/img/icon/fb.png"/>Đăng nhập bằng Facebook
                    </a>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p>Khi click vào đăng nhập nghĩa là bạn đã đồng ý với các điều khoản và chình sách của Lunchify</p>
                <p>Nếu bạn có câu hỏi, hãy tìm câu trả lời trong phần FAQ</p>
            </Modal.Footer>
        </Modal>
    );
}