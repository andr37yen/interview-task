import TicketApiImpl from "../../api/ticket.api";
import TicketApi from "../../api/ticket.api.abstract";
import { sectionMock } from "../../mocks/entities.mock";
import SectionServiceImpl from "./section.service";
import SectionService from "./section.service.abstract";

jest.mock("../../api/ticket.api");

describe("pricesService", () => {
  let ticketApi: TicketApi;
  let sectionService: SectionService;

  beforeAll(() => {
    ticketApi = new TicketApiImpl("fakedomain");
    sectionService = new SectionServiceImpl(ticketApi);
  })

  beforeEach(() => {
    (ticketApi.fetchSections as jest.Mock).mockClear();
  });

  it("should succeed if value of sections inside function changes ", async () => {
    expect(sectionService.getSections()).toEqual([]);

    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);
    expect(await sectionService.fetchSections()).toEqual([sectionMock]);

    expect(sectionService.getSections()).toEqual([sectionMock]);
  });

  it("should return section if found otherwise it throws", async () => {
    const sectionId = 907;

    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);
    await sectionService.fetchSections();

    expect(sectionService.findSectionById(sectionId)).toEqual(sectionMock);

    expect(() => sectionService.findSectionById(0)).toThrow();
  });
});
