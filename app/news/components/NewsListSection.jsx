import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "อบรมฟื้นฟู อสม. ปี 2567",
    date: "15 สิงหาคม 2567",
    description:
      "จัดอบรมเพื่อพัฒนาศักยภาพและฟื้นฟูความรู้ให้กับอาสาสมัครสาธารณสุขประจำหมู่บ้าน เพื่อเสริมสร้างระบบสุขภาพชุมชนให้แข็งแกร่ง",
    fullContent: `
      <h3>การอบรมฟื้นฟูความรู้อาสาสมัครสาธารณสุขประจำหมู่บ้าน ประจำปี 2567</h3>
      
      <p>เมื่อวันที่ 15 สิงหาคม 2567 โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ได้จัดการอบรมฟื้นฟูความรู้ให้กับอาสาสมัครสาธารณสุขประจำหมู่บ้าน (อสม.) ในพื้นที่รับผิดชอบ เพื่อพัฒนาศักยภาพและความรู้ที่จำเป็นในการปฏิบัติหน้าที่</p>
      
      <h4>วัตถุประสงค์ของการอบรม</h4>
      <ul>
        <li>เสริมสร้างความรู้ด้านการส่งเสริมสุขภาพและป้องกันโรค</li>
        <li>พัฒนาทักษะการดูแลสุขภาพเบื้องต้น</li>
        <li>เพิ่มประสิทธิภาพในการทำงานร่วมกับทีมสาธารณสุข</li>
        <li>เสริมสร้างเครือข่ายสุขภาพชุมชนให้แข็งแกร่ง</li>
      </ul>
      
      <h4>หัวข้อการอบรม</h4>
      <ul>
        <li>การดูแลสุขภาพผู้สูงอายุในชุมชน</li>
        <li>การป้องกันและควบคุมโรคติดต่อ</li>
        <li>การให้การปฐมพยาบาลเบื้องต้น</li>
        <li>การส่งเสริมสุขภาพแม่และเด็ก</li>
        <li>การจัดการข้อมูลสุขภาพชุมชน</li>
      </ul>
      
      <p>การอบรมครั้งนี้มีผู้เข้าร่วมกว่า 45 คน จากทุกหมู่บ้านในพื้นที่ตำบลนาคำ ซึ่งจะช่วยยกระดับคุณภาพการให้บริการสาธารณสุขในระดับชุมชนต่อไป</p>
    `,
    image: "/images/about-1.svg",
    category: "การอบรม",
    tags: ["อสม.", "การอบรม", "พัฒนาศักยภาพ", "สุขภาพชุมชน"],
    author: "ทีมสาธารณสุขตำบลนาคำ",
    readTime: "5 นาที",
  },
  {
    id: 2,
    title: "อบรมปรับเปลี่ยนพฤติกรรมกลุ่มเสี่ยง",
    date: "22 กรกฎาคม 2567",
    description:
      "โครงการส่งเสริมการปรับเปลี่ยนพฤติกรรมสุขภาพสำหรับกลุ่มเสี่ยงโรคเบาหวานและความดันโลหิตสูง เน้นการดูแลตนเองและการควบคุมอาหาร",
    fullContent: `
      <h3>โครงการส่งเสริมการปรับเปลี่ยนพฤติกรรมสุขภาพสำหรับกลุ่มเสี่ยง</h3>
      
      <p>เมื่อวันที่ 22 กรกฎาคม 2567 โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ร่วมกับทีมสหวิชาชีพได้จัดโครงการอบรมการปรับเปลี่ยนพฤติกรรมสุขภาพสำหรับประชาชนในกลุ่มเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูง</p>
      
      <h4>กลุ่มเป้าหมาย</h4>
      <ul>
        <li>ผู้ที่มีค่าน้ำตาลในเลือดสูงกว่าปกติ (Pre-diabetes)</li>
        <li>ผู้ที่มีความดันโลหิตขั้นก่อนเป็นโรค (Pre-hypertension)</li>
        <li>ผู้ที่มีน้ำหนักเกินและอ้วน</li>
        <li>ญาติผู้ป่วยโรคเบาหวานและความดันโลหิตสูง</li>
      </ul>
      
      <h4>เนื้อหาการอบรม</h4>
      <ul>
        <li>ความรู้เกี่ยวกับโรคเบาหวานและความดันโลหิตสูง</li>
        <li>การวางแผนอาหารและการนับแคลอรี่</li>
        <li>การออกกำลังกายที่เหมาะสม</li>
        <li>การจัดการความเครียด</li>
        <li>การตรวจสุขภาพด้วยตนเอง</li>
      </ul>
      
      <h4>ผลการดำเนินงาน</h4>
      <p>มีผู้เข้าร่วมโครงการทั้งสิ้น 38 คน ซึ่งจะได้รับการติดตามผลและประเมินการเปลี่ยนแปลงพฤติกรรมอย่างต่อเนื่องเป็นระยะเวลา 6 เดือน</p>
    `,
    image: "/images/about-2.svg",
    category: "ส่งเสริมสุขภาพ",
    tags: ["โรคเบาหวาน", "ความดันโลหิตสูง", "กลุ่มเสี่ยง", "พฤติกรรมสุขภาพ"],
    author: "ทีมสหวิชาชีพ",
    readTime: "7 นาที",
  },
  {
    id: 3,
    title: "เยี่ยมบ้านผู้ป่วยเรื้อรัง",
    date: "10 กันยายน 2567",
    description:
      "ทีมหมอครอบครัวตำบลนาคำออกเยี่ยมบ้านผู้ป่วยเรื้อรัง ติดตามการรักษา ให้คำแนะนำด้านสุขภาพ และประเมินความต้องการดูแลต่อเนื่อง",
    fullContent: `
      <h3>การเยี่ยมบ้านผู้ป่วยเรื้อรัง - การดูแลสุขภาพแบบต่อเนื่อง</h3>
      
      <p>เมื่อวันที่ 10 กันยายน 2567 ทีมหมอครอบครัวตำบลนาคำ ประกอบด้วย แพทย์ พยาบาล เจ้าหน้าที่สาธารณสุข และอาสาสมัครสาธารณสุข ได้ออกเยี่ยมบ้านผู้ป่วยเรื้อรังในพื้นที่รับผิดชอบ</p>
      
      <h4>วัตถุประสงค์การเยี่ยมบ้าน</h4>
      <ul>
        <li>ติดตามอาการและการใช้ยาของผู้ป่วย</li>
        <li>ประเมินสภาพแวดล้อมในบ้านที่อาจส่งผลต่อสุขภาพ</li>
        <li>ให้คำแนะนำด้านการดูแลตนเองและครอบครัว</li>
        <li>ประสานงานการส่งต่อในกรณีที่จำเป็น</li>
        <li>สร้างความเชื่อมั่นและความไว้วางใจกับผู้ป่วยและครอบครัว</li>
      </ul>
      
      <h4>กลุ่มผู้ป่วยที่เยี่ยม</h4>
      <ul>
        <li>ผู้ป่วยโรคเบาหวาน ความดันโลหิตสูง</li>
        <li>ผู้ป่วยโรคหัวใจและหลอดเลือด</li>
        <li>ผู้ป่วยโรคไต เรื้อรัง</li>
        <li>ผู้สูงอายุที่มีภาวะพึ่งพิง</li>
        <li>ผู้ป่วยติดเตียง</li>
      </ul>
      
      <h4>บริการที่ให้ระหว่างการเยี่ยม</h4>
      <ul>
        <li>ตรวจร่างกายเบื้องต้น</li>
        <li>วัดความดันโลหิต น้ำตาลในเลือด</li>
        <li>ประเมินการรับประทานยา</li>
        <li>ให้คำปรึกษาด้านโภชนาการ</li>
        <li>แนะนำการออกกำลังกายที่เหมาะสม</li>
      </ul>
      
      <p>การเยี่ยมบ้านครั้งนี้ครอบคลุมผู้ป่วยเรื้อรัง 25 ราย จาก 18 ครัวเรือน ซึ่งเป็นส่วนหนึ่งของการดูแลสุขภาพแบบองค์รวมและต่อเนื่อง</p>
    `,
    image: "/images/about-3.svg",
    category: "บริการชุมชน",
    tags: ["เยี่ยมบ้าน", "ผู้ป่วยเรื้อรัง", "หมอครอบครัว", "ดูแลต่อเนื่อง"],
    author: "ทีมหมอครอบครัว",
    readTime: "6 นาที",
  },
  {
    id: 4,
    title: "คัดกรองความเสี่ยงโรคเบาหวาน",
    date: "5 กันยายน 2567",
    description:
      "ร่วมกับอาสาสมัครสาธารณสุข จัดกิจกรรมคัดกรองความเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูงให้แก่ประชาชนในพื้นที่",
    fullContent: `
      <h3>กิจกรรมคัดกรองความเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูง</h3>
      
      <p>เมื่อวันที่ 5 กันยายน 2567 โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ร่วมกับอาสาสมัครสาธารณสุขประจำหมู่บ้าน จัดกิจกรรมคัดกรองความเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูง ณ ศาลาประชาคมหมู่บ้าน</p>
      
      <h4>รายการคัดกรอง</h4>
      <ul>
        <li>การวัดความดันโลหิต</li>
        <li>การตรวจน้ำตาลในเลือด (Glucose)</li>
        <li>การวัดส่วนสูง น้ำหนัก และรอบเอว</li>
        <li>การคำนวณดัชนีมวลกาย (BMI)</li>
        <li>การประเมินความเสี่ยงด้วยแบบสอบถาม</li>
      </ul>
      
      <h4>เกณฑ์การประเมิน</h4>
      <ul>
        <li><strong>ความดันโลหิตปกติ:</strong> น้อยกว่า 120/80 mmHg</li>
        <li><strong>ก่อนเป็นโรคความดันโลหิตสูง:</strong> 120-139/80-89 mmHg</li>
        <li><strong>น้ำตาลเลือดปกติ:</strong> น้อยกว่า 100 mg/dl (ขณะอดอาหาร)</li>
        <li><strong>ก่อนเป็นเบาหวาน:</strong> 100-125 mg/dl (ขณะอดอาหาร)</li>
      </ul>
      
      <h4>ผลการคัดกรอง</h4>
      <ul>
        <li>ผู้เข้ารับการคัดกรองทั้งสิ้น 127 คน</li>
        <li>พบกลุ่มเสี่ยงโรคเบาหวาน 23 คน (18.1%)</li>
        <li>พบกลุ่มเสี่ยงความดันโลหิตสูง 31 คน (24.4%)</li>
        <li>ส่งต่อพบแพทย์ 8 คน</li>
      </ul>
      
      <h4>การติดตามผล</h4>
      <p>ผู้ที่อยู่ในกลุ่มเสี่ยงจะได้รับการติดตามอย่างใกล้ชิด และเชิญเข้าร่วมโครงการปรับเปลี่ยนพฤติกรรมสุขภาพ เพื่อป้องกันไม่ให้เกิดโรคในอนาคต</p>
    `,
    image: "/images/hero-health.svg",
    category: "ป้องกันโรค",
    tags: ["คัดกรอง", "เบาหวาน", "ความดันโลหิตสูง", "ป้องกันโรค"],
    author: "ทีมสาธารณสุข",
    readTime: "5 นาที",
  },
  {
    id: 5,
    title: "อบรมการช่วยฟื้นคืนชีพ",
    date: "18 สิงหาคม 2567",
    description:
      "จัดอบรมทักษะการช่วยฟื้นคืนชีพขั้นพื้นฐานให้แก่เจ้าหน้าที่และอาสาสมัครสาธารณสุข เพื่อเตรียมความพร้อมในการช่วยเหลือฉุกเฉิน",
    fullContent: `
      <h3>การอบรมทักษะการช่วยฟื้นคืนชีพขั้นพื้นฐาน (Basic Life Support - BLS)</h3>
      
      <p>เมื่อวันที่ 18 สิงหาคม 2567 โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ได้จัดการอบรมทักษะการช่วยฟื้นคืนชีพขั้นพื้นฐานให้แก่เจ้าหน้าที่สาธารณสุขและอาสาสมัครสาธารณสุข</p>
      
      <h4>วัตถุประสงค์การอบรม</h4>
      <ul>
        <li>เพื่อให้ผู้เข้าอบรมมีความรู้และทักษะในการช่วยฟื้นคืนชีพ</li>
        <li>เพื่อเตรียมความพร้อมในการช่วยเหลือผู้ป่วยฉุกเฉิน</li>
        <li>เพื่อลดอัตราการเสียชีวิตจากการหัวใจหยุดเต้นกะทันหัน</li>
        <li>เพื่อสร้างเครือข่ายการช่วยเหลือฉุกเฉินในชุมชน</li>
      </ul>
      
      <h4>เนื้อหาการอบรม</h4>
      <ul>
        <li>หลักการและความสำคัญของการช่วยฟื้นคืนชีพ</li>
        <li>การประเมินภาวะฉุกเฉินและความปลอดภัย</li>
        <li>เทคนิคการกดหน้าอกที่ถูกต้อง</li>
        <li>การช่วยหายใจเข้า-ออก</li>
        <li>การใช้เครื่องกระตุ้นหัวใจด้วยไฟฟ้า (AED)</li>
        <li>การจัดการทางเดินหายใจที่อุดตัน</li>
      </ul>
      
      <h4>การฝึกปฏิบัติ</h4>
      <ul>
        <li>ฝึกการกดหน้าอกบนหุ่นจำลอง</li>
        <li>ฝึกการให้ลมหายใจเข้า</li>
        <li>ฝึกการทำ CPR แบบทีม</li>
        <li>ฝึกการใช้เครื่อง AED</li>
        <li>สถานการณ์จำลองการช่วยเหลือฉุกเฉิน</li>
      </ul>
      
      <h4>ผลการอบรม</h4>
      <p>มีผู้เข้าร่วมการอบรมทั้งสิ้น 32 คน ซึ่งผ่านการทดสอบทั้งภาคทฤษฎีและภาคปฏิบัติ พร้อมรับประกาศนียบัตรการผ่านการอบรม BLS ที่มีอายุ 2 ปี</p>
      
      <p><strong>สถิติที่น่าสนใจ:</strong> การช่วยฟื้นคืนชีพที่เริ่มภายใน 4 นาทีแรก จะเพิ่มโอกาสรอดชีวิตได้ถึง 40-50%</p>
    `,
    image: "/images/doc-1.svg",
    category: "การอบรม",
    tags: ["การช่วยฟื้นคืนชีพ", "BLS", "ฉุกเฉิน", "CPR"],
    author: "ทีมแพทย์ฉุกเฉิน",
    readTime: "8 นาที",
  },
  {
    id: 6,
    title: "ประเมิน DHSA ด้วยส่วนร่วมชุมชน",
    date: "30 กรกฎาคม 2567",
    description:
      "รับการประเมินมาตรฐาน DHSA โดยการมีส่วนร่วมของชุมชนและเครือข่ายสุขภาพ เพื่อยกระดับคุณภาพการให้บริการสาธารณสุข",
    fullContent: `
      <h3>การประเมินมาตรฐานโรงพยาบาลส่งเสริมสุขภาพตำบล (DHSA) ด้วยการมีส่วนร่วมของชุมชน</h3>
      
      <p>เมื่อวันที่ 30 กรกฎาคม 2567 โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ได้รับการประเมินมาตรฐาน District Health System Assessment (DHSA) จากทีมประเมินภายนอก โดยมีการมีส่วนร่วมของชุมชนและเครือข่ายสุขภาพในพื้นที่</p>
      
      <h4>วัตถุประสงค์การประเมิน DHSA</h4>
      <ul>
        <li>ประเมินคุณภาพการให้บริการสาธารณสุขระดับปฐมภูมิ</li>
        <li>ตรวจสอบระบบการจัดการและบริหารงาน</li>
        <li>ประเมินการมีส่วนร่วมของชุมชนในระบบสุขภาพ</li>
        <li>หาแนวทางพัฒนาและปรับปรุงการให้บริการ</li>
      </ul>
      
      <h4>ด้านที่ได้รับการประเมิน</h4>
      <ul>
        <li><strong>ด้านการบริหารจัดการ:</strong> การวางแผน การจัดการทรัพยากร การพัฒนาบุคลากร</li>
        <li><strong>ด้านการให้บริการ:</strong> บริการส่งเสริม ป้องกัน รักษา ฟื้นฟู</li>
        <li><strong>ด้านระบบสนับสนุน:</strong> ระบบข้อมูล ระบบยา เครื่องมือแพทย์</li>
        <li><strong>ด้านการมีส่วนร่วม:</strong> การมีส่วนร่วมของชุมชน เครือข่ายสุขภาพ</li>
      </ul>
      
      <h4>กระบวนการประเมิน</h4>
      <ul>
        <li>การตรวจเยี่ยมหน่วยงานและสถานที่ให้บริการ</li>
        <li>การสัมภาษณ์เจ้าหน้าที่และผู้ใช้บริการ</li>
        <li>การตรวจสอบเอกสารและข้อมูล</li>
        <li>การสนทนากลุ่มกับตัวแทนชุมชน</li>
        <li>การประเมินจากอาสาสมัครสาธารณสุข</li>
      </ul>
      
      <h4>จุดเด่นที่ได้รับการยกย่อง</h4>
      <ul>
        <li>การมีส่วนร่วมของชุมชนในการพัฒนาสุขภาพ</li>
        <li>ระบบการดูแลผู้ป่วยเรื้อรังที่ครอบคลุม</li>
        <li>การใช้เทคโนโลยีในการให้บริการ</li>
        <li>การทำงานแบบทีมสหวิชาชีพ</li>
        <li>การจัดการข้อมูลที่เป็นระบบ</li>
      </ul>
      
      <h4>ข้อเสนอแนะเพื่อการพัฒนา</h4>
      <ul>
        <li>เพิ่มการใช้ดิจิทัลเทคโนโลยีในการให้บริการ</li>
        <li>พัฒนาระบบการส่งต่อผู้ป่วย</li>
        <li>เสริมสร้างศักยภาพเครือข่ายสุขภาพ</li>
        <li>พัฒนาการประเมินผลลัพธ์ด้านสุขภาพ</li>
      </ul>
      
      <p><strong>ผลการประเมิน:</strong> โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ได้รับการรับรองมาตรฐาน DHSA ในระดับดีเยี่ยม และเป็นต้นแบบการมีส่วนร่วมของชุมชนในจังหวัด</p>
    `,
    image: "/images/doc-2.svg",
    category: "การประเมิน",
    tags: ["DHSA", "มาตรฐาน", "ประเมิน", "ชุมชน", "คุณภาพ"],
    author: "ฝ่ายประกันคุณภาพ",
    readTime: "10 นาที",
  },
];

export default function NewsListSection() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              ข่าวสารและกิจกรรม
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ข่าวและกิจกรรมทั้งหมด
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            ติดตามข่าวสารและกิจกรรมต่างๆ ของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            เพื่อเป็นแหล่งข้อมูลสำคัญในการดูแลสุขภาพชุมชน
          </p>
        </div>

        {/* News Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "ทั้งหมด",
            "การอบรม",
            "ส่งเสริมสุขภาพ",
            "บริการชุมชน",
            "ป้องกันโรค",
            "การประเมิน",
          ].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                category === "ทั้งหมด"
                  ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white/80 text-slate-700 hover:bg-white hover:text-sky-600 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-sky-700 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-200/50">
                    {item.category}
                  </span>
                </div>

                {/* Date badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-200/50">
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-sky-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-slate-700 font-medium">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-sky-50 text-sky-700 rounded-md text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>โดย {item.author}</span>
                  <span>อ่าน {item.readTime}</span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    <span>อ่านเพิ่มเติม</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>

                  {/* Share button */}
                  <button className="p-2 rounded-full hover:bg-sky-50 text-slate-400 hover:text-sky-600 transition-colors duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            โหลดข่าวเพิ่มเติม
          </button>
        </div>
      </div>
    </section>
  );
}

export { newsItems };
