<script>

(function () {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        function () {


            const questions =
                Array.from(
                    document.querySelectorAll(
                        ".question-item-1"
                    )
                );


            /*
             * Trang không có quiz
             * => không chạy
             */
            if (!questions.length) {
                return;
            }


            const grid =
                document.getElementById(
                    "questionGrid-1"
                );


            const answeredCount =
                document.getElementById(
                    "answeredCount-1"
                );


            const unansweredCount =
                document.getElementById(
                    "unansweredCount-1"
                );


            const sidebar =
                document.getElementById(
                    "quizSidebar-1"
                );


            const openMenu =
                document.getElementById(
                    "openQuizMenu-1"
                );


            const closeMenu =
                document.getElementById(
                    "closeQuizMenu-1"
                );


            if (
                !grid ||
                !answeredCount ||
                !unansweredCount
            ) {

                return;

            }


            let isSidebarScrolling =
                false;


            let scrollTimer =
                null;


            /* =================================================
               GRID
            ================================================= */

            questions.forEach(
                function (
                    question,
                    index
                ) {


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.className =
                        "question-btn-1";


                    button.textContent =
                        index + 1;


                    button.dataset.question =
                        index + 1;


                    button.addEventListener(
                        "click",
                        function () {


                            const number =
                                index + 1;


                            setActiveQuestion(
                                number
                            );


                            isSidebarScrolling =
                                true;


                            const top =
                                question
                                    .getBoundingClientRect()
                                    .top +

                                window.pageYOffset -

                                15;


                            window.scrollTo({

                                top:
                                    top,

                                behavior:
                                    "smooth"

                            });


                            if (
                                window.innerWidth <= 768 &&
                                sidebar
                            ) {

                                sidebar
                                    .classList
                                    .remove(
                                        "open-1"
                                    );

                            }


                            clearTimeout(
                                scrollTimer
                            );


                            scrollTimer =
                                setTimeout(
                                    function () {

                                        isSidebarScrolling =
                                            false;

                                        updateActiveByScroll();

                                    },
                                    700
                                );

                        }
                    );


                    grid.appendChild(
                        button
                    );

                }
            );


            /* =================================================
               ACTIVE QUESTION
            ================================================= */

            function setActiveQuestion(
                number
            ) {


                const buttons =
                    grid.querySelectorAll(
                        ".question-btn-1"
                    );


                buttons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "current-1"
                        );

                    }
                );


                const active =
                    grid.querySelector(

                        '[data-question="' +
                        number +
                        '"]'

                    );


                if (active) {

                    active.classList.add(
                        "current-1"
                    );

                }

            }


            /* =================================================
               BỎ DẤU TIẾNG VIỆT
            ================================================= */

            function removeVietnameseTones(
                value
            ) {

                return String(value)

                    .normalize("NFD")

                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    )

                    .replace(
                        /đ/g,
                        "d"
                    )

                    .replace(
                        /Đ/g,
                        "D"
                    );

            }


            /* =================================================
               NORMALIZE ANSWER

               Ví dụ các đáp án sau sẽ được coi giống nhau:

               19;thứ hai
               19; thứ hai
               19 ; Thứ Hai
               19 ; THỨ HAI
               19;thu hai

               Phép nhân:

               5x6
               5 x 6
               5 × 6
               5X6
               5*6
            ================================================= */

            function normalizeAnswer(
                value
            ) {


                let result =
                    String(
                        value ?? ""
                    );


                /*
                 * Chữ thường
                 */
                result =
                    result.toLowerCase();


                /*
                 * Bỏ dấu tiếng Việt
                 */
                result =
                    removeVietnameseTones(
                        result
                    );


                /*
                 * Xóa khoảng trắng đầu / cuối
                 */
                result =
                    result.trim();


                /*
                 * Nhiều khoảng trắng
                 * thành 1 khoảng trắng
                 */
                result =
                    result.replace(
                        /\s+/g,
                        " "
                    );


                /*
                 * Chuẩn hóa dấu ;
                 *
                 * 7 ; 30
                 * 7; 30
                 * 7 ;30
                 *
                 * =>
                 *
                 * 7;30
                 */
                result =
                    result.replace(
                        /\s*;\s*/g,
                        ";"
                    );


                /*
                 * Chuẩn hóa dấu ,
                 *
                 * 2, 9, 16
                 *
                 * =>
                 *
                 * 2,9,16
                 */
                result =
                    result.replace(
                        /\s*,\s*/g,
                        ","
                    );


                /*
                 * Chuẩn hóa phép nhân
                 *
                 * ×
                 * x
                 * X
                 * *
                 *
                 * =>
                 *
                 * x
                 */
                result =
                    result.replace(
                        /[×xX*]/g,
                        "x"
                    );


                /*
                 * Bỏ khoảng trắng quanh x
                 *
                 * 5 x 6
                 *
                 * =>
                 *
                 * 5x6
                 */
                result =
                    result.replace(
                        /\s*x\s*/g,
                        "x"
                    );


                /*
                 * Chuẩn hóa =
                 */
                result =
                    result.replace(
                        /\s*=\s*/g,
                        "="
                    );


                /*
                 * Chuẩn hóa +
                 */
                result =
                    result.replace(
                        /\s*\+\s*/g,
                        "+"
                    );


                /*
                 * Chuẩn hóa -
                 */
                result =
                    result.replace(
                        /\s*-\s*/g,
                        "-"
                    );


                /*
                 * Chuẩn hóa :
                 */
                result =
                    result.replace(
                        /\s*:\s*/g,
                        ":"
                    );


                /*
                 * Chuẩn hóa /
                 */
                result =
                    result.replace(
                        /\s*\/\s*/g,
                        "/"
                    );


                /*
                 * Bỏ dấu chấm,
                 * !, ? ở cuối
                 */
                result =
                    result.replace(
                        /[.!?]+$/g,
                        ""
                    );


                /*
                 * Trim lần cuối
                 */
                result =
                    result.trim();


                return result;

            }


            /* =================================================
               STATS
            ================================================= */

            function updateStats() {


                let answered =
                    0;


                questions.forEach(
                    function (question) {

                        if (
                            question.dataset.status ===
                                "correct" ||

                            question.dataset.status ===
                                "wrong"
                        ) {

                            answered++;

                        }

                    }
                );


                answeredCount.textContent =
                    answered;


                unansweredCount.textContent =
                    questions.length -
                    answered;

            }


            /* =================================================
               GRID STATUS
            ================================================= */

            function updateGrid(
                questionIndex,
                status
            ) {


                const button =
                    grid.querySelector(

                        '[data-question="' +
                        questionIndex +
                        '"]'

                    );


                if (!button) {
                    return;
                }


                button.classList.remove(
                    "correct-1",
                    "wrong-1"
                );


                if (
                    status ===
                    "correct"
                ) {

                    button.classList.add(
                        "correct-1"
                    );

                }


                if (
                    status ===
                    "wrong"
                ) {

                    button.classList.add(
                        "wrong-1"
                    );

                }

            }


            /* =================================================
               LOCK QUESTION
            ================================================= */

            function lockQuestion(
                question
            ) {


                question.dataset.locked =
                    "true";


                const textInput =
                    question.querySelector(
                        ".text-answer-input-1"
                    );


                if (textInput) {

                    textInput.disabled =
                        true;

                }


                const answerButton =
                    question.querySelector(
                        ".check-answer-btn-1"
                    );


                if (answerButton) {

                    answerButton.disabled =
                        true;


                    answerButton.textContent =
                        "Đã trả lời";

                }


                const radios =
                    question.querySelectorAll(
                        'input[type="radio"]'
                    );


                radios.forEach(
                    function (radio) {

                        radio.disabled =
                            true;

                    }
                );


                question.classList.add(
                    "answered-1"
                );

            }


            /* =================================================
               QUESTIONS
            ================================================= */

            questions.forEach(
                function (
                    question,
                    index
                ) {


                    const type =
                        question.dataset.type;


                    const correctAnswer =
                        normalizeAnswer(
                            question.dataset.answer
                        );


                    const solution =
                        question.querySelector(
                            ".solution-1"
                        );


                    /* =============================================
                       TEXT
                    ============================================= */

                    if (
                        type ===
                        "text"
                    ) {


                        const input =
                            question.querySelector(
                                ".text-answer-input-1"
                            );


                        const button =
                            question.querySelector(
                                ".check-answer-btn-1"
                            );


                        if (
                            !input ||
                            !button
                        ) {

                            return;

                        }


                        function checkTextAnswer() {


                            if (
                                question.dataset.locked ===
                                    "true" ||

                                question.dataset.status
                            ) {

                                return;

                            }


                            const value =
                                normalizeAnswer(
                                    input.value
                                );


                            /*
                             * Không nhập gì
                             */
                            if (!value) {

                                input.focus();

                                return;

                            }


                            input.classList.remove(
                                "correct-1",
                                "wrong-1"
                            );


                            /* =====================================
                               CHẤM ĐÁP ÁN

                               Chỉ so sánh sau khi
                               đã normalize.

                               Không dùng startsWith nữa.
                            ===================================== */

                            if (
                                value ===
                                correctAnswer
                            ) {


                                input.classList.add(
                                    "correct-1"
                                );


                                question.dataset.status =
                                    "correct";


                                updateGrid(
                                    index + 1,
                                    "correct"
                                );

                            }

                            else {


                                input.classList.add(
                                    "wrong-1"
                                );


                                question.dataset.status =
                                    "wrong";


                                updateGrid(
                                    index + 1,
                                    "wrong"
                                );

                            }


                            /*
                             * Hiện lời giải
                             */
                            if (solution) {

                                solution.classList.add(
                                    "show-1"
                                );

                            }


                            /*
                             * Khóa câu
                             */
                            lockQuestion(
                                question
                            );


                            /*
                             * Cập nhật thống kê
                             */
                            updateStats();

                        }


                        /*
                         * Click nút Trả lời
                         */
                        button.addEventListener(
                            "click",
                            checkTextAnswer
                        );


                        /*
                         * Enter để trả lời
                         */
                        input.addEventListener(
                            "keydown",
                            function (event) {

                                if (
                                    event.key ===
                                    "Enter"
                                ) {

                                    event.preventDefault();

                                    checkTextAnswer();

                                }

                            }
                        );

                    }


                    /* =============================================
                       RADIO
                    ============================================= */

                    if (
                        type ===
                        "radio"
                    ) {


                        const answers =
                            question
                                .querySelectorAll(
                                    ".answer-1"
                                );


                        answers.forEach(
                            function (answer) {


                                answer.addEventListener(
                                    "click",
                                    function () {


                                        if (
                                            question.dataset.locked ===
                                                "true" ||

                                            question.dataset.status
                                        ) {

                                            return;

                                        }


                                        answers.forEach(
                                            function (
                                                item
                                            ) {

                                                item.classList.remove(
                                                    "selected-1",
                                                    "correct-1",
                                                    "wrong-1"
                                                );

                                            }
                                        );


                                        const input =
                                            answer.querySelector(
                                                "input"
                                            );


                                        if (!input) {
                                            return;
                                        }


                                        input.checked =
                                            true;


                                        answer.classList.add(
                                            "selected-1"
                                        );


                                        const selectedValue =
                                            normalizeAnswer(
                                                input.value
                                            );


                                        if (
                                            selectedValue ===
                                            correctAnswer
                                        ) {


                                            answer.classList.add(
                                                "correct-1"
                                            );


                                            question.dataset.status =
                                                "correct";


                                            updateGrid(
                                                index + 1,
                                                "correct"
                                            );

                                        }

                                        else {


                                            answer.classList.add(
                                                "wrong-1"
                                            );


                                            question.dataset.status =
                                                "wrong";


                                            updateGrid(
                                                index + 1,
                                                "wrong"
                                            );


                                            /*
                                             * Hiện đáp án đúng
                                             */
                                            answers.forEach(
                                                function (
                                                    item
                                                ) {


                                                    const radio =
                                                        item.querySelector(
                                                            "input"
                                                        );


                                                    if (!radio) {
                                                        return;
                                                    }


                                                    if (
                                                        normalizeAnswer(
                                                            radio.value
                                                        ) ===
                                                        correctAnswer
                                                    ) {

                                                        item.classList.add(
                                                            "correct-1"
                                                        );

                                                    }

                                                }
                                            );

                                        }


                                        /*
                                         * Hiện lời giải
                                         */
                                        if (
                                            solution
                                        ) {

                                            solution.classList.add(
                                                "show-1"
                                            );

                                        }


                                        /*
                                         * Khóa câu
                                         */
                                        lockQuestion(
                                            question
                                        );


                                        /*
                                         * Cập nhật thống kê
                                         */
                                        updateStats();

                                    }
                                );

                            }
                        );

                    }

                }
            );


            /* =================================================
               MOBILE SIDEBAR
            ================================================= */

            if (openMenu) {

                openMenu.addEventListener(
                    "click",
                    function () {

                        if (sidebar) {

                            sidebar.classList.add(
                                "open-1"
                            );

                        }

                    }
                );

            }


            if (closeMenu) {

                closeMenu.addEventListener(
                    "click",
                    function () {

                        if (sidebar) {

                            sidebar.classList.remove(
                                "open-1"
                            );

                        }

                    }
                );

            }


            /* =================================================
               ACTIVE SCROLL
            ================================================= */

            function updateActiveByScroll() {


                if (
                    isSidebarScrolling
                ) {

                    return;

                }


                let closestQuestion =
                    null;


                let closestDistance =
                    Infinity;


                const targetY =
                    window.innerHeight *
                    .28;


                questions.forEach(
                    function (question) {


                        const rect =
                            question
                                .getBoundingClientRect();


                        const distance =
                            Math.abs(
                                rect.top -
                                targetY
                            );


                        if (
                            rect.bottom > 0 &&

                            rect.top <
                                window.innerHeight &&

                            distance <
                                closestDistance
                        ) {


                            closestDistance =
                                distance;


                            closestQuestion =
                                question;

                        }

                    }
                );


                if (
                    closestQuestion
                ) {

                    setActiveQuestion(
                        closestQuestion
                            .dataset
                            .questionIndex
                    );

                }

            }


            let scrollRAF =
                null;


            window.addEventListener(
                "scroll",
                function () {


                    if (
                        scrollRAF
                    ) {

                        cancelAnimationFrame(
                            scrollRAF
                        );

                    }


                    scrollRAF =
                        requestAnimationFrame(
                            updateActiveByScroll
                        );

                },
                {
                    passive:
                        true
                }
            );


            window.addEventListener(
                "resize",
                updateActiveByScroll
            );


            /* =================================================
               INIT
            ================================================= */

            updateStats();

            updateActiveByScroll();


        }
    );

})();
</script>
