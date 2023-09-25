import SectionId from "../enums/SectionId";

const sectionsData = {
  [SectionId.Welcome]: {
    label: "Welcome to Conseas",
    titleEn: "Welcome to Conseas Health Care Coordination",
    titleAr: "مرحبًا بكم في CONSEAS لتنسيق الرعاية الصحية",
    textEn:
      "Conseas Health aims to facilitate access to medical consultation services in the United States for clients. The project will serve as a bridge connecting clients with healthcare providers in the U.S. Clients will be able to receive written consultations and access other services through the platform. The platform will provide a convenient and secure way for clients to connect with healthcare providers working in top rated academic health institutions in the U.S.A.",
    textAr:
      "تهدف Conseas Health إلى تسهيل وصول المرضى الموجودين في الإمارات العربية المتحدة إلى الخدمات الطبية في الولايات المتحدة الأمريكية. سيعمل المشروع كجسر يربط العملاء بمقدمي الرعاية الصحية في الولايات المتحدة. سيتمكن العملاء من تلقي استشارات مكتوبة والوصول إلى خدمات أخرى من خلال المنصة. ستوفر المنصة طريقة مريحة وآمنة للعملاء للتواصل مع مقدمي الرعاية الصحية العاملين في المؤسسات الصحية الأكاديمية الأعلى تصنيفاً في الولايات المتحدة الأمريكية.",
    list: [
      {
        image: "/assets/icons/heart.svg",
        titleEn: "Work from the Heart",
        titleAr: "نعمل من القلب",
        textEn:
          "We care about your health with all our heart and sincerity so you can live happily.",
        textAr: "نحنُ نهتمُّ بصحتك من كلِّ قلوبنا وبإخلاص تام حتى تعيش بسعادة.",
      },
      {
        image: "/assets/icons/service-with-smile.svg",
        titleEn: "Serve With Smile",
        titleAr: "نقدِّمُ الخدمة بابتسامة",
        textEn:
          "Our services will always provide you with a evidence based practice because we prioritize the comfort of our clients.",
        textAr: "سيحييك أطبائنا دائماً بابتسامةٍ، لأننا نعطي الأولوية لراحة مرضانا.",
      },
      {
        image: "/assets/icons/accurate-diagnostics.svg",
        titleEn: "Accurate Diagnostics",
        titleAr: "تشخيص دقيق",
        textEn:
          "We connect you with specialized health care providers who are experts in the care about your health with all our heart and sincerity so you can live happily.",
        textAr:
          "نحن نوصلك بمقدمي الرعاية الصحية المتخصصين في رعاية صحتك بكل إخلاص حتى تتمكن من العيش بسعادة.",
      },
    ],
    hasListTitle: true,
    hasListText: true,
  },
  [SectionId.Imaging]: {
    label: "Imaging Second Opinion",
    titleEn: "Imaging second opinion",
    titleAr: "رأي إضافي للصور",
    textEn: "how does it work?",
    textAr: "كيف تعمل؟",
    list: [
      {
        image: "/assets/icons/imaging1.svg",
        titleEn: "Create Account for Free",
        titleAr: "إنشاء حساب مجاناً",
        textEn: "Create a free Conseas account",
        textAr: "إنشاء حساب مجاني على Conseas",
      },
      {
        image: "/assets/icons/imaging2.svg",
        titleEn: "Submit & Pay",
        titleAr: "تأكيد & دفع",
        textEn: "Upload your scans, reason for study, and connect to a radiologist",
        textAr: "حمِّل صورك الممسوحة ضوئياً وسبب الدراسة واتَّصل بأخصائي الأشعة",
      },
      {
        image: "/assets/icons/imaging3.svg",
        titleEn: "Review",
        titleAr: "مراجعة",
        textEn:
          "Receive a second opinion report and talk to your doctor to discuss treatment options",
        textAr: "احصل على تقرير رأيٍّ ثانٍ وتحدَّث إلى طبيبك لمناقشة خيارات العلاج",
      },
    ],
    hasListTitle: true,
    hasListText: true,
  },
  [SectionId.WhyChoose]: {
    label: "Why Choose",
    titleEn: "Comprehensive and Convenient Care",
    titleAr: "رعاية شاملة ومناسبة",
    textEn:
      "CONSEAS offers a comprehensive range of healthcare coordination services, including helping with clients with managing electronic medical records, imaging consultation and experts second opinion.",
    textAr:
      "تقدم CONSEAS مجموعة شاملة من خدمات تنسيق الرعاية الصحية ، بما في ذلك مساعدة العملاء في إدارة السجلات الطبية الإلكترونية واستشارات التصوير ورأي الخبراء الثاني.",
    list: [
      {
        image: "/assets/icons/why-choose1.svg",
        titleEn: "Quality",
        titleAr: "جودة",
        textEn: "100%",
        textAr: "100%",
      },
      {
        image: "/assets/icons/why-choose2.svg",
        titleEn: "Patients a year",
        titleAr: "مريض في السنة",
        textEn: "5791",
        textAr: "5791",
      },
      {
        image: "/assets/icons/why-choose3.svg",
        titleEn: "Appointments",
        titleAr: "حجز",
        textEn: "150+",
        textAr: "150+",
      },
      {
        image: "/assets/icons/why-choose4.svg",
        titleEn: "People working",
        titleAr: "الأشخاص العاملون",
        textEn: "38",
        textAr: "38",
      },
    ],
    hasListTitle: true,
    hasListText: true,
  },
  [SectionId.Reasons]: {
    label: "Reasons For",
    titleEn: "Reasons For a Radiology Second Opinion",
    titleAr: "العوامل التي تعزِّزُ الرَّأي الثاني في الأشعة",
    textEn: "Factors Promoting a Second Opinion in Radiology",
    textAr: "العوامل التي تعزِّزُ الرَّأي الثاني في الأشعة",
    list: [
      {
        image: "/assets/icons/reasons-for1.svg",
        titleEn: "Delayed Report & Need Answers Fast",
        titleAr: "تقرير متأخر وتحتاج إلى إجابات سريعة",
        textEn:
          "Your issue might be serious, but it's been weeks without answers. A second opinion will get you answers fast, and let you move forward with treatment.",
        textAr:
          "قد تكون مشكلتك خطيرة، لكنها مرَّتْ أسابيع دون إجابات. سوف يمنحك الرأي الثاني إجابات سريعة، ويتيحُ لك المضي قُدماً في العلاج.",
      },
      {
        image: "/assets/icons/reasons-for2.svg",
        titleEn: "Peace of Mind",
        titleAr: "راحة البال",
        textEn:
          "Worrying about your health shouldn't keep you up at night. Having an expert give you a second opinion should put your mind at ease.",
        textAr:
          "لا ينبغي أن يجعلك القلق بشأن صحتك مستيقظاً في الليل. سيريحك وجود خبير يعطيك رأياً ثانياً.",
      },
      {
        image: "/assets/icons/reasons-for3.svg",
        titleEn: "Confirm Diagnosis Before Treatment",
        titleAr: "تأكَّد من التشخيص قبل العلاج",
        textEn:
          "You're concerned if your doctor is correct, and wondering if the diagnosis is correct for your treatment plan.",
        textAr:
          "أنت قلقٌ بشأن ما إذا كان طبيبك على صواب، وتتساءل عمَّا إذا كان التشخيص صحيحاً لخطة العلاج الخاصة بك!",
      },
    ],
    hasListTitle: true,
    hasListText: true,
  },
  [SectionId.Testimonials]: {
    label: "Testimonials",
    titleEn: "What Our Patients Say about us!",
    titleAr: "ماذا يقول مرضانا؟",
    textEn: "text",
    textAr: "text",
    list: [
      {
        image: "/assets/icons/what-says1.svg",
        titleEn: "SATISFIED PATIENTS",
        titleAr: "مريض راضٍ",
        textEn: "2050 +",
        textAr: "2050 +",
      },
      {
        image: "/assets/icons/what-says2.svg",
        titleEn: "HEALTH SECTIONS",
        titleAr: "قسم صحي",
        textEn: "35 +",
        textAr: "35 +",
      },
    ],
    hasListTitle: true,
    hasListText: true,
  },
  [SectionId.BestInNation]: {
    label: "The Best in the Nation",
    titleEn: "The Best in the Nation",
    titleAr: "الأفضل في الوطن",
    textEn: "Trained at schools including",
    textAr: "التدريب في مؤسسات تعليمية تشمل",
    list: [
      { image: "/assets/icons/best-nation1.svg" },
      { image: "/assets/icons/best-nation2.svg" },
      { image: "/assets/icons/best-nation3.svg" },
      { image: "/assets/icons/best-nation4.svg" },
      { image: "/assets/icons/best-nation5.svg" },
    ],
    hasListTitle: false,
    hasListText: false,
  },
  // [SectionId.AboutUs]: {
  //   label: "About Us",
  //   titleEn: "About CONSEAS platform",
  //   titleAr: "نبذة عن منصة CONSEAS",
  //   textEn: `Welcome to Conseas, a premier medical company dedicated to revolutionizing healthcare
  //       solutions and providing unparalleled patient care. With a strong commitment to excellence,
  //       we are driven by our mission to deliver the highest quality medical services to every
  //       individual we serve. At Conseas, we firmly believe in a patient-centered approach, where
  //       your comfort, well-being, and trust are our top priorities.

  //       As a comprehensive healthcare provider, we offer an extensive range of cutting-edge
  //       medical services tailored to meet your diverse needs. From state-of-the-art diagnostic
  //       testing and precise medical consultations to advanced surgical procedures and
  //       comprehensive rehabilitation services, we strive to be your one-stop destination for
  //       exceptional healthcare. Our team of experienced and compassionate medical professionals
  //       specializes in various fields, including cardiology, neurology, orthopedics, pediatrics,
  //       and beyond.

  //       To ensure that you receive the most advanced and effective treatments, we are committed to
  //       staying ahead of the curve in medical research and technology. We continuously invest in
  //       the latest equipment and provide ongoing training for our medical staff, ensuring that we
  //       remain at the forefront of medical innovation. Moreover, we foster strong collaborations
  //       with other healthcare providers, facilitating a seamless and comprehensive approach to
  //       your medical care.

  //       At Conseas, we understand that each patient is unique and deserves individualized care.
  //       That&apos;s why we take the time to develop a deep understanding of your medical history,
  //       concerns, and aspirations. We believe in forging strong patient-doctor relationships built
  //       on trust, empathy, and open communication. Your needs and preferences guide our medical
  //       decisions, empowering you to actively participate in your healthcare journey.

  //       Above all, we pride ourselves on providing compassionate care that addresses not only your
  //       physical well-being but also your emotional and psychological needs. Our dedicated team is
  //       committed to creating a warm and welcoming environment, ensuring your comfort and peace of
  //       mind throughout your healthcare experience.

  //       Thank you for choosing Conseas as your trusted healthcare partner. We are honored to have
  //       the opportunity to serve you and your family. Together, let us embark on a journey towards
  //       optimal health and well-being.`,
  //   textAr: `مرحباً بكم في Conseas، شركة طبية رائدة مُكرَّسة لإحداث ثورة في حلول الرعاية الصحية وتقديم رعاية لا مثيل لها للمرضى. مع التزام قوي بالتميز، نحن مدفوعون بمهمتنا لتقديم خدمات طبية عالية الجودة لكلِّ فردٍ نخدمه.

  //     في Conseas، نؤمن إيماناً راسخاً بالنهج الذي يركّزُ على المريض، حيثُ تكون راحتك ورفاهيتك وثقتك هي أهم أولوياتنا. بصفتنا مقدّم رعاية صحية شاملة، نقدّم مجموعة واسعة من الخدمات الطبية المتطورة المُصمَّمة خصيصاً لتلبية احتياجاتك المتنوعة. من أحدث الاختبارات التشخيصية والاستشارات الطبية الدقيقة إلى الإجراءات الجراحية المتقدّمة وخدمات إعادة التأهيل الشاملة، نحنُ نسعى جاهدين لنكون وجهتك الأولى للحصول على رعاية صحيّة استثنائية.

  //     يتخصص فريقنا من المهنيين الطبيين ذوي الخبرة والتعاطف في مختلف المجالات، بما في ذلك أمراض القلب والأعصاب وجراحة العظام وطب الأطفال وما بعدها. لضمان حصولك على العلاجات الأكثر تقدّماً وفعاليَّةً، نحنُ ملتزمون بالبقاء في الصدارة في مجال البحوث والتكنولوجيا الطبية. نستثمر باستمرار في أحدث المعدات ونوفر تدريباً مستمراً لموظفينا الطبيين، مما يضمن بقائنا في طليعة الابتكار الطبي.علاوةً على ذلك، فإنَّنا نعزّزُ التعاون القوي مع مقدمي الرعاية الصحية الآخرين، مما يُسهِّلُ اتَّباع نهجٍ سلسٍ وشاملٍ لرعايتك الطبية.

  //     ندركُ في Conseas أن كلَّ مريضٍ فريد من نوعه ويستحق رعاية فردية. لهذا السبب نخصص الوقت الكافي لتطوير فهم عميق لتاريخك الطبي ومخاوفك وتطلعاتك. نحن نؤمن بإقامة علاقات قوية بين المريض والطبيب مبنية على الثقة والتعاطف والتواصل المفتوح. تُوَجِّهُ احتياجاتك وتفضيلاتك قراراتنا الطبية، مما يتيح لك المشاركة بنشاط في رحلة الرعاية الصحية الخاصة بك. قبل كل شيء، نحنُ نفخرُ بأنفسنا لأننا نُقدِّمُ رعايةً رحيمةً لا تتناول فقط صحتك الجسدية ولكن أيضاً احتياجاتك العاطفية والنفسية. يلتزمُ فريقنا المتفاني بخلق بيئة دافئة ومرحِّبة، مما يضمن راحتك وراحة بالك طوال تجربة الرعاية الصحية الخاصة بك. شكرلاً لاختيارك Conseas كشريك موثوق في الرعاية الصحية. يُشرِّفنا أن تُتاح لنا الفرصة لخدمتك أنت وعائلتك. معاً، لنبدأ رحلة نحو الصحة والرفاهية المُثلى.`,
  //   list: [
  //     {
  //       image: "/assets/icons/heart.svg",
  //       titleEn: "Work from the Heart",
  //       titleAr: "نعمل من القلب",
  //       textEn:
  //         "We care about your health with all our heart and sincerity so you can live happily.",
  //       textAr: "نحنُ نهتمُّ بصحتك من كلِّ قلوبنا وبإخلاص تام حتى تعيش بسعادة.",
  //     },
  //     {
  //       image: "/assets/icons/service-with-smile.svg",
  //       titleEn: "Serve With Smile",
  //       titleAr: "نقدِّمُ الخدمة بابتسامة",
  //       textEn:
  //         "Our doctors will always greet you with a smile because we prioritize the comfort of our patients.",
  //       textAr: "سيحييك أطبائنا دائماً بابتسامةٍ، لأننا نعطي الأولوية لراحة مرضانا.",
  //     },
  //     {
  //       image: "/assets/icons/accurate-diagnostics.svg",
  //       titleEn: "Accurate Diagnostics",
  //       titleAr: "تشخيص دقيق",
  //       textEn:
  //         "We connect you with healthcare providers who specialize in taking care of your health wholeheartedly so that you can live happily.",
  //       textAr:
  //         "نحن نوصلك بمقدمي الرعاية الصحية المتخصصين في رعاية صحتك بكل إخلاص حتى تتمكن من العيش بسعادة.",
  //     },
  //   ],
  //   hasListTitle: true,
  //   hasListText: true,
  // },
};

export default sectionsData;
