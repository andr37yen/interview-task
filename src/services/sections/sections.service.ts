import ticketApi from "../../api/ticket.api.js";
import { Section } from "../../models/entities.js";

const sectionService = () => {

  let sections: Section[] = [];

  const fetchSections = async (): Promise<Section[]> => {
    sections = await ticketApi.fetchSections();

    return sections;
  }

  const getSections = ():Section[] => {
    return sections;
  } 

  const findSectionById = (sectionId: number): Section => {
    const section = sections.find(
      (el) => el.Id === sectionId
    );

    if (!section) throw new Error("Could not find section by id");

    return section;
  }

  return Object.freeze({
    fetchSections,
    getSections,
    findSectionById,
  });
}

export default sectionService();