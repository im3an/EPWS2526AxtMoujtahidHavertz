package de.thk.gm.ep.findmypet.models

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import java.io.Serializable
import java.util.UUID

@Embeddable
class ParticipantsId(@Column(name = "account_id") val accountId: UUID, @Column(name = "report_id") val reportid: UUID): Serializable{
}