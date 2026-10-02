/*    MathPdf.create({
    
     ---- target:"#math-pdf-box" dung cho modal-----
   
     target:"#math-pdf-box",

    title:title,

    data:data,

    -----------
        true:
        PDF có đáp án cuối file

        false:
        chỉ có đề
    -----------

    showAnswers:true,


  
    ------    Có thể đổi hoặc bỏ ""------------


    watermark:
        "© TOANHAY.VN",


    footer:
        "© 2026 TOANHAY.VN"


});*/

/* =========================================================
   PLUGIN MATH PDF
========================================================= */

 
  (function(window, document){

    "use strict";

    const MathPdf = {

        config: {

            target: "#xu-ly",

            title: "Bài tập Toán",

            data: [],

            mainTitle: "BÀI TẬP TOÁN",

            showAnswers: true,

            buttonText: "Tải PDF",

            watermark: "© TOANHAY.VN",

            footer: "© 2026 TOANHAY.VN"

        },


        /* =====================================================
           CREATE
        ===================================================== */

        create(options = {}){

            this.config = {
                ...this.config,
                ...options
            };


            if(!Array.isArray(this.config.data)){

                console.error(
                    "MathPdf: data phải là Array"
                );

                return false;
            }


            this.injectCSS();


            /*
             * Render NGAY vào modal.
             *
             * Không chờ html2pdf.
             */

            return this.render();

        },


        /* =====================================================
           CSS
        ===================================================== */

        injectCSS(){

            if(
                document.getElementById(
                    "math-pdf-plugin-css"
                )
            ){
                return;
            }


            const style =
                document.createElement("style");


            style.id =
                "math-pdf-plugin-css";


            style.textContent = `


                /* =========================================
                   WRAPPER
                ========================================= */

                .math-pdf-wrapper{

                    width:100%;

                    font-family:
                        "Times New Roman",
                        serif;

                    color:#000;

                }


                /* =========================================
                   TOOLBAR
                ========================================= */

                .math-pdf-toolbar{

                    display:flex;

                    justify-content:center;

                    align-items:center;

                    width:100%;

                    padding:12px 0 18px;

                }


                .math-pdf-download{

                    appearance:none;

                    border:0;

                    outline:none;

                    background:#2563eb;

                    color:#fff;

                    padding:11px 24px;

                    border-radius:8px;

                    font-size:16px;

                    font-weight:700;

                    line-height:1.2;

                    cursor:pointer;

                    transition:
                        background .2s,
                        transform .1s;

                }


                .math-pdf-download:hover{

                    background:#1d4ed8;

                }


                .math-pdf-download:active{

                    transform:scale(.98);

                }


                .math-pdf-download:disabled{

                    opacity:.65;

                    cursor:wait;

                }


                /* =========================================
                   PDF CONTENT
                ========================================= */

                .math-pdf-content{

                    width:210mm;

                    min-height:297mm;

                    max-width:100%;

                    margin:0 auto;

                    padding:
                        12mm
                        15mm
                        20mm;

                    box-sizing:border-box;

                    background:#fff;

                    color:#000;

                    font-family:
                        "Times New Roman",
                        serif;

                    font-size:15px;

                    line-height:1.5;

                }


                /* =========================================
                   TITLE
                ========================================= */

                .math-pdf-main-title{

                    margin:
                        0
                        0
                        5px;

                    text-align:center;

                    font-size:22px;

                    line-height:1.3;

                    font-weight:700;

                }


                .math-pdf-subtitle{

                    margin:
                        0
                        0
                        20px;

                    text-align:center;

                    font-size:16px;

                    line-height:1.4;

                    font-weight:600;

                }


                /* =========================================
                   STUDENT
                ========================================= */

                .math-pdf-student{

                    display:grid;

                    grid-template-columns:
                        minmax(0, 2.25fr)
                        minmax(120px, .75fr);

                    align-items:center;

                    column-gap:14mm;

                    width:100%;

                    margin-bottom:20px;

                    padding:
                        0
                        5mm
                        0
                        2mm;

                    box-sizing:border-box;

                }


                .math-pdf-student-name,
                .math-pdf-student-class{

                    display:flex;

                    align-items:flex-end;

                    min-width:0;

                    white-space:nowrap;

                }


                .math-pdf-student-name::after,
                .math-pdf-student-class::after{

                    content:"";

                    flex:1;

                    min-width:20px;

                    height:17px;

                    margin-left:7px;

                    border-bottom:
                        1px dotted #555;

                }


                /* =========================================
                   QUESTION
                ========================================= */

                .math-pdf-question-list{

                    width:100%;

                }


                .math-pdf-question{

                    width:100%;

                    margin-bottom:13px;

                    break-inside:avoid;

                    page-break-inside:avoid;

                }


                .math-pdf-question-text{

                    width:100%;

                    line-height:1.5;

                }


                .math-pdf-question-number{

                    font-weight:700;

                }


                /* =========================================
                   ANSWER LINE
                ========================================= */

                .math-pdf-answer-line{

                    display:flex;

                    align-items:flex-end;

                    width:100%;

                    gap:6px;

                    margin-top:6px;

                    padding-left:15px;

                    box-sizing:border-box;

                }


                .math-pdf-answer-label{

                    white-space:nowrap;

                }


                .math-pdf-answer-dot{

                    display:block;

                    flex:1;

                    height:17px;

                    border-bottom:
                        1px dotted #555;

                }


                /* =========================================
                   ANSWER SECTION
                ========================================= */

                .math-pdf-answer-section{

                    width:100%;

                    break-before:page;

                    page-break-before:always;

                    padding-top:4px;

                }


                .math-pdf-answer-title{

                    margin:
                        0
                        0
                        18px;

                    text-align:center;

                    font-size:20px;

                    font-weight:700;

                }


                .math-pdf-answer-grid{

                    display:grid;

                    grid-template-columns:
                        1fr
                        1fr;

                    column-gap:35px;

                    row-gap:8px;

                    width:100%;

                }


                .math-pdf-answer-item{

                    padding:4px 0;

                    font-size:14px;

                    line-height:1.4;

                    break-inside:avoid;

                    page-break-inside:avoid;

                }


                /* =========================================
                   MODAL DISPLAY
                ========================================= */

                #xu-ly .math-pdf-wrapper{

                    width:100%;

                }


                #xu-ly .math-pdf-content{

                    margin-left:auto;

                    margin-right:auto;

                    box-shadow:
                        0
                        3px
                        20px
                        rgba(0,0,0,.10);

                }


                /* =========================================
                   MOBILE
                ========================================= */

                @media(max-width:800px){

                    .math-pdf-content{

                        width:100%;

                        min-height:0;

                        padding:
                            25px
                            16px
                            35px;

                    }


                    .math-pdf-main-title{

                        font-size:20px;

                    }


                    .math-pdf-subtitle{

                        font-size:15px;

                    }


                    .math-pdf-student{

                        grid-template-columns:
                            minmax(0, 1.8fr)
                            minmax(90px, .7fr);

                        column-gap:14px;

                        padding:
                            0
                            5px;

                    }


                    .math-pdf-answer-grid{

                        grid-template-columns:
                            1fr;

                    }

                }


            `;


            document.head.appendChild(style);

        },


        /* =====================================================
           RENDER
        ===================================================== */

        render(){

            let target =
                this.config.target;


            if(typeof target === "string"){

                target =
                    document.querySelector(
                        target
                    );

            }


            if(!target){

                console.error(
                    "MathPdf: Không tìm thấy target:",
                    this.config.target
                );

                return false;
            }


            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "math-pdf-wrapper";


            wrapper.innerHTML = `

                <div class="math-pdf-toolbar">

                    <button
                        type="button"
                        class="math-pdf-download"
                    >
                        ${this.escapeHTML(
                            this.config.buttonText
                        )}
                    </button>

                </div>


                <div class="math-pdf-content">


                    <div class="math-pdf-main-title">

                        ${this.escapeHTML(
                            this.config.mainTitle
                        )}

                    </div>


                    <div class="math-pdf-subtitle">

                        ${this.escapeHTML(
                            this.config.title
                        )}

                    </div>


                    <div class="math-pdf-student">


                        <div class="math-pdf-student-name">

                            Họ và tên:

                        </div>


                        <div class="math-pdf-student-class">

                            Lớp:

                        </div>


                    </div>


                    <div class="math-pdf-question-list">

                        ${this.renderQuestions()}

                    </div>


                    ${this.renderAnswers()}


                </div>

            `;


            target.innerHTML = "";


            target.appendChild(
                wrapper
            );


            const button =
                wrapper.querySelector(
                    ".math-pdf-download"
                );


            button.addEventListener(
                "click",
                ()=>{

                    this.download(
                        wrapper,
                        button
                    );

                }
            );


            return true;

        },


        /* =====================================================
           QUESTIONS
        ===================================================== */

        renderQuestions(){

            return this.config.data

                .map(
                    (item,index)=>{


                        const question =
                            Array.isArray(item)
                            ? item[0]
                            : "";


                        return `

                            <div class="math-pdf-question">


                                <div class="math-pdf-question-text">


                                    <span class="math-pdf-question-number">

                                        Câu ${index + 1}.

                                    </span>


                                   ${this.escapeHTML(this.cleanQuestion(question || ""))}
                         


                                </div>


                                <div class="math-pdf-answer-line">


                                    <span class="math-pdf-answer-label">

                                        Đáp số:

                                    </span>


                                    <span class="math-pdf-answer-dot"></span>


                                </div>


                            </div>

                        `;

                    }
                )

                .join("");

        },


        /* =====================================================
           ANSWERS
        ===================================================== */

        renderAnswers(){

            if(!this.config.showAnswers){

                return "";

            }


            const html =
                this.config.data

                .map(
                    (item,index)=>{


                        const answer =
                            Array.isArray(item)
                            ? item[1]
                            : "";


                        return `

                            <div class="math-pdf-answer-item">

                                <strong>

                                    Câu ${index + 1}:

                                </strong>

                                ${this.escapeHTML(
                                    answer || ""
                                )}

                            </div>

                        `;

                    }
                )

                .join("");


            return `

                <div class="math-pdf-answer-section">


                    <div class="math-pdf-answer-title">

                        ĐÁP ÁN

                    </div>


                    <div class="math-pdf-answer-grid">

                        ${html}

                    </div>


                </div>

            `;

        },


        /* =====================================================
           DOWNLOAD
        ===================================================== */

        download(wrapper, button){

            if(button){

                button.disabled = true;

                button.textContent =
                    "Đang tạo PDF...";

            }


            const run = ()=>{

                this.generatePdf(wrapper)

                .finally(()=>{

                    if(button){

                        button.disabled = false;

                        button.textContent =
                            this.config.buttonText;

                    }

                });

            };


            /*
             * Chỉ load html2pdf
             * khi cần tải PDF.
             */

            if(window.html2pdf){

                run();

                return;
            }


            this.loadHtml2Pdf(run);

        },


        /* =====================================================
           LOAD HTML2PDF
        ===================================================== */

        loadHtml2Pdf(callback){

            if(window.html2pdf){

                callback();

                return;
            }


            const id =
                "math-pdf-html2pdf-lib";


            const old =
                document.getElementById(id);


            if(old){

                if(old.dataset.loaded === "1"){

                    callback();

                }else{

                    old.addEventListener(
                        "load",
                        callback,
                        {
                            once:true
                        }
                    );

                }

                return;
            }


            const script =
                document.createElement(
                    "script"
                );


            script.id = id;


            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";


            script.async = true;


            script.onload =
                function(){

                    script.dataset.loaded =
                        "1";

                    callback();

                };


            script.onerror =
                function(){

                    console.error(
                        "MathPdf: Không tải được html2pdf.js"
                    );

                    alert(
                        "Không tải được thư viện tạo PDF. Vui lòng thử lại."
                    );

                };


            document.head.appendChild(
                script
            );

        },


        /* =====================================================
           GENERATE PDF
        ===================================================== */

        generatePdf(wrapper){

            const element =
                wrapper.querySelector(
                    ".math-pdf-content"
                );


            if(!element){

                return Promise.reject(
                    new Error(
                        "Không tìm thấy nội dung PDF"
                    )
                );

            }


            const options = {


                /*
                 * Chừa riêng 20mm
                 * cuối mỗi trang
                 * cho footer.
                 */

                margin:[
                    12,
                    0,
                    20,
                    0
                ],


                filename:

                    this.createFileName(
                        this.config.title
                    ),


                image:{

                    type:"jpeg",

                    quality:0.98

                },


                html2canvas:{

                    scale:2,

                    useCORS:true,

                    letterRendering:true,

                    scrollX:0,

                    scrollY:0,

                    backgroundColor:
                        "#ffffff"

                },


                jsPDF:{

                    unit:"mm",

                    format:"a4",

                    orientation:"portrait"

                },


                pagebreak:{

                    mode:[
                        "css",
                        "legacy"
                    ],

                    before:
                        ".math-pdf-answer-section",

                    avoid:[
                        ".math-pdf-question",
                        ".math-pdf-answer-item"
                    ]

                }

            };


            return html2pdf()

                .set(options)

                .from(element)

                .toPdf()

                .get("pdf")

                .then(
                    pdf=>{

                        this.addCopyright(
                            pdf
                        );

                    }
                )

                .save();

        },


        /* =====================================================
           COPYRIGHT / FOOTER
        ===================================================== */

        addCopyright(pdf){

            const totalPages =
                pdf.internal
                .getNumberOfPages();


            const pageWidth =
                pdf.internal
                .pageSize
                .getWidth();


            const pageHeight =
                pdf.internal
                .pageSize
                .getHeight();


            for(
                let page=1;
                page<=totalPages;
                page++
            ){

                pdf.setPage(page);


                /* =========================================
                   WATERMARK
                ========================================= */

                if(this.config.watermark){

                    pdf.setTextColor(
                        232,
                        232,
                        232
                    );


                    pdf.setFont(
                        "helvetica",
                        "bold"
                    );


                    pdf.setFontSize(
                        22
                    );


                    pdf.text(

                        String(
                            this.config.watermark
                        ),

                        pageWidth / 2,

                        pageHeight / 2,

                        {
                            align:"center",
                            angle:35
                        }

                    );

                }


                /* =========================================
                   FOOTER LINE
                ========================================= */

                pdf.setDrawColor(
                    215,
                    215,
                    215
                );


                pdf.setLineWidth(
                    .2
                );


                pdf.line(

                    15,

                    pageHeight - 14,

                    pageWidth - 15,

                    pageHeight - 14

                );


                /* =========================================
                   FOOTER
                ========================================= */

                pdf.setTextColor(
                    120,
                    120,
                    120
                );


                pdf.setFont(
                    "helvetica",
                    "normal"
                );


                pdf.setFontSize(
                    7.5
                );


                if(this.config.footer){

                    pdf.text(

                        String(
                            this.config.footer
                        ),

                        15,

                        pageHeight - 9

                    );

                }


                /* =========================================
                   PAGE NUMBER
                ========================================= */

                pdf.text(

                    "Trang " +
                    page +
                    " / " +
                    totalPages,

                    pageWidth - 15,

                    pageHeight - 9,

                    {
                        align:"right"
                    }

                );

            }

        },


        /* =====================================================
           SLUG
        ===================================================== */

        slugify(text){

            let value =
                String(
                    text ||
                    "bai-tap-toan"
                );


            value = value

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
                )

                .toLowerCase()

                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )

                .replace(
                    /^-+|-+$/g,
                    ""
                );


            return (
                value ||
                "bai-tap-toan"
            );

        },


        /* =====================================================
           FILE NAME
        ===================================================== */

        createFileName(title){

            return (
                this.slugify(title)
                +
                ".pdf"
            );

        },


        /* =====================================================
           HTML ESCAPE
        ===================================================== */

        escapeHTML(value){

            return String(
                value ?? ""
            )

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

        }



        cleanQuestion(str) {

    let value = String(str ?? "");

    // Decode HTML entity nhiều lớp
    // Ví dụ:
    // &amp;#x110;  -> &#x110; -> Đ
    for (let i = 0; i < 3; i++) {

        const textarea = document.createElement("textarea");

        textarea.innerHTML = value;

        const decoded = textarea.value;

        // Nếu không còn gì để decode thì dừng
        if (decoded === value) {
            break;
        }

        value = decoded;
    }

    // Làm sạch dữ liệu
    value = value

        // Bỏ markdown **
        .replace(/\*\*/g, "")

        // NBSP -> space thường
        .replace(/\u00A0/g, " ")

        // Xóa zero-width character nếu có
        .replace(/[\u200B-\u200D\uFEFF]/g, "")

        // Gom nhiều khoảng trắng
        .replace(/[ \t]+/g, " ")

        // Bỏ khoảng trắng đầu cuối
        .trim();

    return value;
}

      

    };


    window.MathPdf =
        MathPdf;


})(window, document);
  
