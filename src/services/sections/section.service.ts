import TicketApi from "src/api/ticket.api.abstract";
import { Section } from "../../models/entities";
import SectionService from "./section.service.abstract";

class SectionServiceImpl implements SectionService {
  private _sections: Section[] = [];

  constructor(private _ticketApi: TicketApi) {};

  public async fetchSections(): Promise<Section[]> {
    this._sections = await this._ticketApi.fetchSections();

    return this._sections;
  }

  public getSections(): Section[] {
    return this._sections;
  }

  public findSectionById(sectionId: number): Section {
    const section = this._sections.find((el) => el.Id === sectionId);

    if (!section) throw new Error("Could not find section by id");

    return section;
  }
}

export default SectionServiceImpl;
