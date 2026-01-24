package de.thk.gm.ep.findmypet.models

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.*

@Entity
class Invitation(
    var isActive: Boolean = true,

    @Column(unique = true, nullable = false, updatable = false)
    val token : String = generateToken(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id", nullable = false)
    val missingReport: MissingReport,

    @Column(nullable = false, updatable = false)
    val expirationDate: LocalDateTime = LocalDateTime.now().plusDays(7)


) {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    val id: UUID? = null

    fun isValid(): Boolean{
        return isActive && this.expirationDate.isAfter(LocalDateTime.now())
    }

    companion object {
        fun generateToken(): String{
            val possibleChars = "23456789ABCDEFGHKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz"
            return (1..12).map { possibleChars.random() }.joinToString("")
        }
    }
}
