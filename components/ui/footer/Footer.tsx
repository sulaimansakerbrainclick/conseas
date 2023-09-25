import locationIcon from "@/public/assets/icons/location.svg";
import phoneIcon from "@/public/assets/icons/phone.svg";
import emailIcon from "@/public/assets/icons/email.svg";
import whatsappIcon from "@/public/assets/icons/whatsapp.svg";
import Image from "next/image";
import classNames from "classnames";
import logoIcon from "@/public/assets/icons/logo.svg";
import facebookIcon from "@/public/assets/icons/facebook2.svg";
import twitterIcon from "@/public/assets/icons/twitter.svg";
import instaIcon from "@/public/assets/icons/insta.svg";
import linkedinIcon from "@/public/assets/icons/linkedin2.svg";
import paymentIcon1 from "@/public/assets/icons/payment1.svg";
import paymentIcon2 from "@/public/assets/icons/payment2.svg";
import { useTranslation } from "next-i18next";
import EmailSubscriptionForm, {
  EmailSubscriptionFormValues,
} from "@/components/forms/email-subscription-form/EmailSubscriptionForm";
import showSuccessToast from "@/utils/showSuccessToast";
import footerLinks from "@/data/footerLinks";
import Link from "next/link";
import { Service } from "@prisma/client";
import useIsRtl from "@/components/hooks/useIsRtl";
import links from "@/data/links";
import Links from "@/enums/Links";
import { FormikHelpers } from "formik";
import image from "@/public/assets/images/home3.png";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import emailSubscriptionService from "@/services/emailSubscriptionService";

const Footer = ({
  services,
  appSettings,
}: {
  services?: Service[];
  appSettings: AppSettingFormValues;
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const items = [
    {
      key: "Our Address",
      value: isRtl ? appSettings.addressAr : appSettings.addressEn,
      icon: locationIcon,
      href: "https://www.google.com/maps",
    },
    {
      key: "Call Us",
      value: appSettings.callUs,
      icon: phoneIcon,
      href: `tel:${appSettings.callUs}`,
    },
    {
      key: "Our Mail",
      value: appSettings.email,
      icon: emailIcon,
      href: `mailto:${appSettings.email}`,
    },
    {
      key: "WhatsApp Us",
      value: appSettings.whatsapp,
      icon: whatsappIcon,
      href: `https://api.whatsapp.com/send?phone=${appSettings.whatsapp}`,
    },
  ];

  const socialItems = [
    {
      url: appSettings.facebookLink,
      icon: facebookIcon,
    },
    {
      url: appSettings.twitterLink,
      icon: twitterIcon,
    },
    {
      url: appSettings.instagramLink,
      icon: instaIcon,
    },
    {
      url: appSettings.linkedinLink,
      icon: linkedinIcon,
    },
  ];

  const onEmailSubscription = (
    { email }: EmailSubscriptionFormValues,
    { setSubmitting, resetForm }: FormikHelpers<EmailSubscriptionFormValues>
  ) => {
    setSubmitting(true);

    emailSubscriptionService
      .addSubscription(email)
      .then((res) => {
        showSuccessToast(res.data.message);
        resetForm();
      })
      .catch((e) => {});
  };

  return (
    <div className="relative overflow-hidden">
      <div className="container pt-10.5">
        <div className="mb-20">
          <div className="py-5 flex bg-white rounded-2xl shadow-sm">
            <div className="w-full lg:flex justify-between">
              {items.map(({ key, value, icon, href }, index) => (
                <div
                  key={key}
                  className={classNames("flex-1 flex gap-5 px-5 max-lg:mb-4", {
                    "border-l border-gray-100": index !== 0,
                  })}
                >
                  <div>
                    <div className="w-12.5 h-12.5 rounded-full border border-color-1 flex justify-center items-center">
                      <Image src={icon} alt="" className="w-7.5 h-7.5" />
                    </div>
                  </div>

                  <div>
                    <div className="font-light text-sm mb-2">{t(key)}</div>

                    <Link
                      href={href}
                      target="_blank"
                      className="font-medium text-color-1 text-base"
                    >
                      {value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between max-lg:gap-8 max-lg:text-center">
            <div className="basis-[30%]">
              <div className="mb-7">
                <Image src={logoIcon} alt="" className="w-65 h-auto" />
              </div>

              <p className="mb-7.5">
                {isRtl ? appSettings.shortDescritionAr : appSettings.shortDescritionEn}
              </p>

              <div className="flex max-lg:justify-center gap-2.5">
                {socialItems.map(({ icon, url }, index) => (
                  <div key={index}>
                    <Link href={url}>
                      <div className="w-12.5 h-12.5 rounded-full border border-color-1 flex justify-center items-center">
                        <Image src={icon} alt="" className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {services && services.length !== 0 && (
              <div>
                <div className="font-bold text-xl text-color-1 -6.5 mb-5">{t("Services")}</div>

                {services.map(({ id, nameEn, nameAr }) => (
                  <div key={id} className=" mb-[0.875rem]">
                    <Link href={`/services/${id}`}>{isRtl ? nameAr : nameEn}</Link>
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="font-bold text-xl text-color-1 -6.5 mb-5">{t("Pages")}</div>

              {footerLinks.map((link) => (
                <div key={link.href} className=" mb-[0.875rem]">
                  <Link href={link.href}>{t(link.label)}</Link>
                </div>
              ))}
            </div>

            <div>
              <div className="font-bold text-xl text-color-1 -6.5 mb-5">{t("Subscribe")}</div>

              <div className="mb-5">
                <EmailSubscriptionForm
                  initialValues={{ email: "" }}
                  onSubmit={onEmailSubscription}
                />
              </div>

              <div>{t("Get The Latest Updates via email.")}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between py-7 border-t border-white max-lg:gap-8">
          <div className="max-lg:order-3">
            <span className="text-sm">
              <span>{t("All Copyright © Reseved CONSEAS | Developed By")} </span>

              {isRtl && (
                <a
                  target="_blank"
                  href="https://brainclickads.com?lng=ar"
                  rel="noreferrer"
                  className="text-color-1 font-bold"
                >
                  {t("Brain Click")}
                </a>
              )}

              {!isRtl && (
                <a
                  target="_blank"
                  href="https://brainclickads.com"
                  rel="noreferrer"
                  className="text-color-1 font-bold"
                >
                  {t("Brain Click")}
                </a>
              )}
            </span>
          </div>

          <div className="max-lg:order-1">
            <div className="flex justify-center items-center gap-4">
              <Image src={paymentIcon2} alt="" width={55} height={33} />
              <Image src={paymentIcon1} alt="" width={68} height={21} />
            </div>
          </div>

          <div className="max-lg:order-2">
            <div className="flex">
              <Link href={links[Links.PrivacyAndPolicy].href}>
                {t(links[Links.PrivacyAndPolicy].label)}
              </Link>
              <Link
                href={links[Links.TermsAndConditions].href}
                className="ltr:pl-[0.75rem] rtl:pr-[0.75rem] ltr:ml-4 rtl:mr-4 ltr:border-l rtl:border-r  border-neutral-400"
              >
                {t(links[Links.TermsAndConditions].label)}
              </Link>
              {/* <Link
                href={links[Links.Help].href}
                className="ltr:pl-[0.75rem] rtl:pr-[0.75rem] ltr:ml-4 rtl:mr-4 ltr:border-l rtl:border-r border-neutral-400"
              >
                {t(links[Links.Help].label)}
              </Link> */}
              <Link
                href={links[Links.TelemedicinePolicy].href}
                className="ltr:pl-[0.75rem] rtl:pr-[0.75rem] ltr:ml-4 rtl:mr-4 ltr:border-l rtl:border-r border-neutral-400"
              >
                {t(links[Links.TelemedicinePolicy].label)}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        unoptimized
        className="-z-[1] object-cover pt-23"
      />
    </div>
  );
};

export default Footer;
