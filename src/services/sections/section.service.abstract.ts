import { Section } from "../../models/entities";

abstract class SectionService {

  public abstract fetchSections(): Promise<Section[]>;

  public abstract getSections(): Section[];

  public abstract findSectionById(sectionId: number): Section;
}

export default SectionService;