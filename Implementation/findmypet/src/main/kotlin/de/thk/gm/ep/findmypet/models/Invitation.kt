package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.*

@Entity
class Invitation(
    var isActive: Boolean = true,

    @Column(unique = true, nullable = false)
    var token : String = generateToken(),

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    val missingReport: MissingReport

) {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null
    val expirationDate: LocalDateTime = LocalDateTime.now().plusDays(7)

    fun isValid(): Boolean{
        return this.expirationDate.isAfter(LocalDateTime.now())
    }

    companion object {
        fun generateToken(): String{
            val possibleChars = "23456789ABCDEFGHKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz"
            return (1..12).map { possibleChars.random() }.joinToString("")
        }
    }
}
