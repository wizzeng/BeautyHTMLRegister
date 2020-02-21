$().ready(() => {
    addFocusListener();
    $('#register-btn').on('click', () => {
        validateForm();
        if (errorStack.length === 0) {
            alert('提交成功');
        }
    });
    validateForm()
});

let errorStack = [];

function validateForm() {
    $('#register-form').validate({
        onkeyup: false,
        success: (error, el) => {
            setTimeout(() => {
                el.parentElement.classList = 'input-item input-item-focus'
            }, 600)
        },
        errorPlacement: function (error, element) {
            let inputItem = element.parent();
            errorStack = error[0].innerText === '' ? [] : [error[0].innerText];
            if (error[0].innerText !== '') {
                setTimeout(() => {
                    let tag = inputItem.children('span.error-text');
                    if (tag.length !== 0) {
                        tag[0].classList = 'error-text error-text-left';
                        setTimeout(() => {
                            for (let i = 0; i < tag.length; i++) {
                                tag[i].remove();
                            }
                            mountErrorText(inputItem, error[0].innerText);
                        }, 500)
                    } else {
                        mountErrorText(inputItem, error[0].innerText);
                    }
                }, 500)
            } else {
                let tag = inputItem.children('span.error-text');
                if (tag.length !== 0) {
                    tag[0].classList = 'error-text error-text-left';
                    setTimeout(() => {
                        for (let i = 0; i < tag.length; i++) {
                            tag[i].remove();
                        }
                    }, 300);
                }
            }
        },
        rules: {
            username: {
                required: true,
                minlength: 8
            },
            password: {
                required: true,
                minlength: 8
            },
            'pass-confirm': {
                required: true,
                equalTo: '#password'
            },
            email: {
                required: true,
                email: true,
            },
            address: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            username: {
                required: '请输入用户名',
                minlength: '用户名不少于8位'
            },
            password: {
                required: '请输入密码',
                minlength: '密码不少于8位'
            },
            'pass-confirm': {
                required: '请输入确认密码',
                equalTo: '两次输入的密码不相同'
            },
            email: {
                required: '请输入Email',
                email: 'Email 格式不正确'
            },
            address: {
                required: '请输入地址',
                minlength: '地址长度至少为10位'
            }
        }
    })
}

function mountErrorText(target, text) {
    const errorTag = document.createElement('span');
    errorTag.innerText = text;
    errorTag.classList = 'error-text';
    target.attr('class', 'input-item input-item-error');
    target.append(errorTag)
}

function addFocusListener() {
    let inputBoxGroup = $('.input-item');
    let inputGroup = $('.input-item input');
    let backupPlaceholder = {};
    for (let i = 0; i < inputGroup.length; i++) {
        inputGroup[i].onfocus = () => {
            inputBoxGroup[i].classList = 'input-item input-item-focus';
            backupPlaceholder[i] = (inputGroup[i].placeholder);
            inputGroup[i].placeholder = ''
        };
        inputGroup[i].onchange = (event) => {
            if (event.target.value !== '') {
                inputBoxGroup[i].classList = 'input-item input-item-focus';
            }
        };
        inputGroup[i].onblur = (event) => {
            if (event.target.value === '') {
                inputBoxGroup[i].classList = 'input-item';
                inputGroup[i].placeholder = backupPlaceholder[i];
            }
        }
    }
}
