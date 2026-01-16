package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.ParticipantsDto
import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import de.thk.gm.ep.findmypet.services.AccountService
import de.thk.gm.ep.findmypet.services.MissingReportService
import de.thk.gm.ep.findmypet.services.ParticipantsService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@RestController
@RequestMapping("/participants")
class ParticipantsRestController(
    private val participantsService: ParticipantsService,
    private val missingReportService: MissingReportService,
    private val accountService: AccountService
) {

    @PostMapping
    fun saveParticipant(
        @Valid @RequestBody participantsDto: ParticipantsDto
    ): Participants {
        val missingReport = missingReportService.getById(participantsDto.missingReportId)
        val account = accountService.getById(participantsDto.accountId)
        if (missingReport != null && account != null) {
            val participants = Participants(
                ParticipantsId(participantsDto.accountId,participantsDto.missingReportId),
                account,
                missingReport
            )
            participantsService.save(participants)
            return participants

        } else {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing Report or User")
        }

    }


    @GetMapping()
    fun getParticipants(): List<Participants> {
        return participantsService.getAll()
    }

    @GetMapping("/{accountId}/{missingReportId}")
    fun getParticipantById(
        @PathVariable accountId: UUID,
        @PathVariable missingReportId: UUID
    ): Participants {
        val participantsId = ParticipantsId(accountId, missingReportId)
        return participantsService.getById(participantsId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No Participant with id $participantsId found")
    }

    @GetMapping("/{accountId}")
    fun getParticipantsByAccount(
        @PathVariable accountId: UUID
    ) : List<Participants> {
        val account = accountService.getById(accountId)

        account?.let {
            return participantsService.getByAccount(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No Account with id $accountId found")
    }

    @GetMapping("/{missingReportId}")
    fun getParticipantByMissingReport(
        @PathVariable missingReportId: UUID
    ) : List<Participants> {
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            return participantsService.getByMissingReport(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No Missing Report with id $missingReportId found")
    }

//    @PutMapping("/{accountId}/{missingReportId}")
//    fun updateParticipant(
//        @PathVariable accountId: UUID,
//        @PathVariable missingReportId: UUID,
//        @Valid @RequestBody participantsDto: ParticipantsDto
//    ){
//        val missingReport = missingReportService.getById(participantsDto.missingReportId)
//        val account = accountService.getById(participantsDto.accountId)
//
//        if (missingReport != null && account != null) {
//            val participants = ParticipantsId(accountId, missingReportId)
//            participantsService.getById(participants)?.let {
//                it.account
//
//            participantsService.save(participants)
//            } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No Participant with id $participantsId found")
//            return participants
//
//        } else {
//            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing Report or User")
//        }
//    }

    @DeleteMapping("/{accountId}/{missingReportId}")
    fun deleteParticipant(
        @PathVariable accountId: UUID,
        @PathVariable missingReportId: UUID
    ){

        val participantsId = ParticipantsId(accountId, missingReportId)
        participantsService.getById(participantsId)?.let {
        participantsService.delete(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "No Participant with id $participantsId found")

    }

}