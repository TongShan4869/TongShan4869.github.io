import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Short Description",
          multiline: true,
        }),
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Featured on Homepage",
          defaultValue: false,
        }),
        date: fields.date({ label: "Date" }),
        links: fields.object({
          github: fields.url({ label: "GitHub URL" }),
          paper: fields.url({ label: "Paper URL" }),
          demo: fields.url({ label: "Demo URL" }),
          dataset: fields.url({ label: "Dataset URL" }),
          poster: fields.url({ label: "Poster URL" }),
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts",
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    news: collection({
      label: "News",
      slugField: "title",
      path: "src/content/news/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About",
      path: "src/content/singletons/about",
      format: { data: "json" },
      schema: {
        bioShort: fields.text({
          label: "Short Bio (homepage)",
          multiline: true,
        }),
        bioFull: fields.text({ label: "Full Bio", multiline: true }),
        researchInterests: fields.text({
          label: "Research Interests",
          multiline: true,
        }),
        photo: fields.image({
          label: "Profile Photo",
          directory: "public/images",
          publicPath: "/images",
        }),
      },
    }),
    cv: singleton({
      label: "CV",
      path: "src/content/singletons/cv",
      format: { data: "json" },
      schema: {
        education: fields.array(
          fields.object({
            degree: fields.text({ label: "Degree" }),
            institution: fields.text({ label: "Institution" }),
            year: fields.text({ label: "Year" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
          }),
          {
            label: "Education",
            itemLabel: (props) => props.fields.institution.value,
          }
        ),
        experience: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            institution: fields.text({ label: "Institution" }),
            year: fields.text({ label: "Year" }),
            description: fields.text({
              label: "Description",
              multiline: true,
            }),
          }),
          {
            label: "Experience",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        awards: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            year: fields.text({ label: "Year" }),
          }),
          {
            label: "Awards",
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills",
        }),
        memberships: fields.array(
          fields.object({
            name: fields.text({ label: "Organization" }),
            description: fields.text({
              label: "Role/Description",
              multiline: true,
            }),
          }),
          {
            label: "Professional Memberships",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),
    site: singleton({
      label: "Site Settings",
      path: "src/content/singletons/site",
      format: { data: "json" },
      schema: {
        name: fields.text({
          label: "Name",
          defaultValue: "Tong Shan",
        }),
        tagline: fields.text({
          label: "Tagline",
          defaultValue: "Researcher / Engineer / Creator",
        }),
        email: fields.text({ label: "Email" }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        linkedinUrl: fields.url({ label: "LinkedIn URL" }),
        scholarUrl: fields.url({ label: "Google Scholar URL" }),
        researchgateUrl: fields.url({ label: "ResearchGate URL" }),
        xUrl: fields.url({ label: "X (Twitter) URL" }),
        musicUrl: fields.url({ label: "Music Portfolio URL" }),
        formspreeId: fields.text({ label: "Formspree Form ID" }),
        cvPdfPath: fields.text({
          label: "CV PDF Path",
          defaultValue: "/files/cv.pdf",
        }),
      },
    }),
  },
});
